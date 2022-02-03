/**
 * @purpose      To develop an api for Bookstore application
 * @module       index
 * @description  creating app,mount middleware and establish db connection
 * @author       deepak
 * @version      1.0 
 * @since        1/2/2022
 * 
 */

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes';
import database from './config/database';
import logger, { logStream } from './config/logger';
import morgan from 'morgan';

import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;
app.use(morgan('combined', { stream: logStream }));
app.use(express.json());

database();

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;

// import cors from 'cors';
// import helmet from 'helmet';
// app.use(cors());
// app.use(helmet());
// app.use(express.urlencoded({ extended: true }));