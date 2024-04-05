import { Server } from 'socket.io';
import * as http from 'http';

export const socketAuth = (server: http.Server): Server => {

  const origin = process.env.ORIGIN_URL;

  const io = new Server(server, { cors: { origin: origin?.split(',') }, pingInterval: 6000 });

  io.use(async (socket, next) => {
    // const token = socket.handshake?.headers?.token?.split(' ')[1];
    // if (token) {
    //   const user = await decodeAuthToken(token);
    //   if (!user) next(Error('Unauthorized user'));
    //   socket.join(user?.id);
    next();
    // }
  });

  return io;
};

