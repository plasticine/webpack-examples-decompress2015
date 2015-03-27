'use strict';

require('dotenv').load();

if (process.env.NODE_ENV === 'development') {
  process.env.DEBUG = 'server,server:*';
}

import logger, {stream} from './utils/logger';
logger.info('Booting UI server...');

import morgan from 'morgan';
import express from 'express';
const server = express();

import RenderMiddleware from './middleware/RenderMiddleware';

global.console.info = logger.info;
global.console.warn = logger.warn;

server.set('env', process.env.NODE_ENV);
server.set('port', process.env.SERVER_PORT);
server.use(morgan('dev', {stream: stream}));
server.use('/favicon.ico', (req, res) => res.status(404).send('Not found'));
server.use('/', RenderMiddleware);
server.use((error, request, response, next) => {
  logger.error(error.stack);
  response.status(500);
  if (request.xhr) {
    response.type('json').send(JSON.stringify(error));
  } else {
    response.type('html').send(`<pre>${error.stack.toString()}</pre>`);
  }
});
server.listen(server.get('port'), function() {
  logger.info(`UI (${server.get('env')} mode) server listening at http://127.0.0.1:${this.address().port}`);
});
