import { Router } from 'express';
import { create, Delete, get, getSingle, login, update, check, logout } from './entity';
import { IEntity } from '@type/express';

const router = Router();

export default function user (params: IEntity) {    
  
  router.post('/user', create(params));
  router.get('/user', get(params));
  router.post('/user/login', login(params));
  router.get('/user/logout', logout(params));
  router.get('/user/check', check(params));

  router.delete('/user/:id', Delete(params));
  router.put('/user/:id', update(params));
  router.get('/user/:id', getSingle(params));

  return router;
}

