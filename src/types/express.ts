import { Server } from 'socket.io';

export interface IEntity {
  ws: Server
}

export interface IFile {
  name: string
  path: string
  fieldName: string
}