import { Router } from 'express';
import { find } from './entity';
import { IEntity } from '@type/express';

const router = Router();

export default function group(params: IEntity) {
    router.get('/group', find(params));
    return router;
}

