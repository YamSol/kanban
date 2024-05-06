import express from 'express';
import 'dotenv/config';
import { router } from './routes';
import cors from 'cors'; 

const server = express();

// Use o middleware CORS para permitir solicitações de origens diferentes
server.use(cors());

server.use(express.json());
server.use(router);
export { server };
