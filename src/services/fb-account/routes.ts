import { Router } from 'express';
import { create, Delete, get, getSingle, update } from './entity';
import { IEntity } from '@type/express';

const fbRouter = Router();

export default function bfAccount(params: IEntity) {

  fbRouter.post('/facebook/account', create(params));
  fbRouter.get('/facebook/account', get(params));

  fbRouter.delete('/facebook/account/:id', Delete(params));
  fbRouter.put('/facebook/account/:id', update(params));
  fbRouter.get('/facebook/account/:id', getSingle(params));

  return fbRouter;
}

