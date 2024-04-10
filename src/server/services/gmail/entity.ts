import { type Request, Response } from 'express';
import { IEntity } from '@type/express';
import { Gmail } from './schema';
import { Account } from '../../../bot/gmail/account';
const action = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INPUT: 'input',
  RUNNING: 'running'
};

export const create = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    // const GmailAccount = new Account(ws);
    // const userData = await GmailAccount.create(req.body);
    // console.log(userData);

    const accounts = new Gmail(req.body);
    await accounts.save();
    res.status(200).send(accounts);
  } catch (error) {
    ws.emit(action.ERROR, 'Error occurred smoothing wrong action');
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const Delete = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await Gmail.findByIdAndDelete({ _id: id });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const update = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await Gmail.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const get = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const account = await Gmail.find();
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const getSingle = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const account = await Gmail.findById({ _id: id });
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};
