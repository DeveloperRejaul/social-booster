import { IEntity } from '@type/express';
import { Group } from './schema';
import { Request, Response } from 'express';

export const find = ({ ws }: IEntity) => async (req: Request, res: Response): Promise<void> => {
    try {
        const groupe = await Group.find().populate('accounts');
        res.status(200).send(groupe);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
};