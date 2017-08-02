import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { api } from '../api';


const start = ((options) => {
  return new Promise((resolve, reject) => {
    if (!options.port) {
      reject(new Error('The server must be started with an available port'));
    }

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(helmet());
    app.use((err, req, res, next) => {
      reject(new Error(`Something went wrong!, err: ${err}`));
      res.status(500).send('Something went wrong!');
    });
    app.get('/', (req, res) => {
      res.send(`Hello! The API is at http://localhost:${options.port}/api`);
    });
    app.use('/api/v1', api);


    const server = app.listen(options.port, () => resolve(server)); // with out spdy
  });
});

export default start;
