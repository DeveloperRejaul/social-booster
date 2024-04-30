import { NextFunction, Response } from 'express';
import { User } from '../server/services/user/schema';
import jwt from 'jsonwebtoken';
import { IRequest, IUser } from '@type/express';

export const auth = async (res: Response, req: IRequest, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return res.status(400).send('Authorization Token Required');
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(400).send('Authorization failed');

    //@ts-ignore
    const user: IUser = jwt.decode(token);
    if (!user) return res.status(400).send('Authorization failed');

    // check user exists
    const userExists = await User.findOne({ email: user.email });
    if (!userExists) return res.status(400).send('Authorization failed');
    req.email = userExists.email;
    req.id = userExists.id;
    req.rule = userExists.rule;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('soothing wrong');
  }

};