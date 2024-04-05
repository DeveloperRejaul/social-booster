import express from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { parse } from 'express-form-data';
import * as http from 'http';
import { mongoDBConnect } from './utils/db';
import { routers } from './services';
import settings from './setting';
import { socketAuth } from './utils/socket';
import { Socket } from 'socket.io';


export default async function server() {

  const port = process.env.SERVER_PORT || 4000;
  const origin = process.env.ORIGIN_URL;
  const app = express();
  const server: http.Server = http.createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(parse());
  const corsOptions = { origin: origin?.split(','), credentials: true, optionSuccessStatus: 200 };
  app.use(cors(corsOptions));



  // connect db 
  await mongoDBConnect();

  const io = socketAuth(server);


  const socket = new Promise<Socket>((r) => {
    io.on('connection', (s) => {
      console.log(`user connected: ${s.id}`);
      s.on('disconnect', () => {
        console.log(`user disconnect: ${s.id}`);
      });
      r(s);
    });
  });



  // handle static file build file handle and crate client folder
  const clientPath = path.join(path.resolve(), 'src/server/client');
  if (!fs.existsSync(clientPath)) fs.mkdirSync(clientPath);
  app.use(express.static(clientPath));

  // create folder for media
  const mediaFilePath = path.join(path.resolve(), settings.media.dir);
  if (!fs.existsSync(mediaFilePath)) fs.mkdirSync(mediaFilePath);

  // send clint file to frontend
  app.get('/', (req, res) => { res.sendFile(path.join(clientPath, 'index.html')); });

  // define all routers for jobs 
  app.get('/api', (_req, res) => res.send({ message: 'server is ok' }));
  routers.forEach(async router => app.use('/api', router({ ws: await socket })));


  server.listen(port, () => console.log(`app listening on port ${port}!`));
}
