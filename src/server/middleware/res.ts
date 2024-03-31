import { NextFunction, Request } from 'express';
import { IRes, IResponse } from '../../types/express';

export const res = async (res: IResponse, req: Request, next: NextFunction) => {
  next();
};