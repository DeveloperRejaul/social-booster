import { Request } from 'express';
import { Server } from 'socket.io';

export interface IEntity {
  ws: Server
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