import { Router } from 'express';
import { create, Delete, get, getSingle, update } from './entity';
import { IEntity } from '@type/express';

const router = Router();

export default function gmail(params: IEntity) {

  router.post('/gmail', create(params));
  router.get('/gmail', get(params));
  router.delete('/gmail/:id', Delete(params));
  router.put('/gmail/:id', update(params));
  router.get('/gmail/:id', getSingle(params));

  return router;
}

