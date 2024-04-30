import {type Request, Response } from 'express';
import { IEntity, IUser } from '@type/express';
import { User } from './schema';
import jwt from 'jsonwebtoken';


export const create = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<void> => {
  try {
    const accounts = new User(req.body);
    await accounts.save();
    res.status(200).send(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};

export const Delete = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await User.findByIdAndDelete({ _id: id });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};

export const update = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await User.findByIdAndUpdate({_id:id}, {$set:req.body}, {new:true});
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};

export const get = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<void> => {
  try {
    const account = await User.find();
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};

export const getSingle = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await User.findById({_id: id});
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};

export const check = ({ws}: IEntity)=> async(req: Request, res: Response) => {
  try {
    const token = req.cookies[process.env.JWT_SECRET!];
    
    
    //@ts-ignore
    const user: IUser = jwt.decode(token);
    if (!user) return res.status(400).send('Authorization  failed');

    
    // check user exists
    const userExists = await User.findOne({email:user.email});

    if (!userExists) return res.status(400).send('Authorization failed');
    return res.status(200).send(userExists);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong'); 
  }
};

export const login = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<unknown> => {
  try {
    const account = await User.findOne({email: req.body.email});
    if(account?.password === req.body.password) {
      const token = jwt.sign({
        name: req.body.name,
        rule: req.body.rule,
        email: req.body.email,
      }, 'secret', { expiresIn: '7d' });
      res.cookie(process.env.JWT_SECRET!, token,{
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + 86400000*7/*7 days*/) 
      });
      return res.status(200).send({...account, token});
    }
    res.status(400).send('Email or password incorrect');
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};


export const logout = ({ws}: IEntity)=> async(req: Request, res: Response): Promise<unknown> => {
  try {
    res.cookie(process.env.JWT_SECRET!, '',{
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now()) 
    });
    return res.status(200).send('Logout successful');
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong'); 
  }
};



