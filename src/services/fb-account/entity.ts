/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, Response } from 'express';
import { IEntity } from '@type/express';
import { FBAccounts } from './schema';
import { Gmail } from '../gmail/schema';


export const create = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<any> => {
  try {
    const gmail = await Gmail.findOne({ email: req.body.email });
    if (!gmail) return res.status(400).send('Gmail not exists');

    const accounts = new FBAccounts(req.body);
    await accounts.save();
    res.status(200).send(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const Delete = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await FBAccounts.findByIdAndDelete({ _id: id });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const update = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await FBAccounts.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const get = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const account = await FBAccounts.find();
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const getSingle = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await FBAccounts.findById({ _id: id });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};
