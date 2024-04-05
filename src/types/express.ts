import { Request } from 'express';
import { Socket } from 'socket.io';

export interface IEntity {
  ws: Socket
}

export interface IFile {
  name: string
  path: string
  fieldName: string
}

export interface IUser {
  name: string;
  email: string;
  rule: string;
  id: string
}

export interface IRequest extends Request {
  name: string;
  email: string;
  rule: string;
  id: string
}