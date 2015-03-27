'use strict';

import express from 'express';
import logger from '../utils/logger';
import React from 'react';
import Router from 'react-router';
import routes from '../../src/routes';
import ApplicationLayout from '../layouts/ApplicationLayout';

const RenderMiddleware = express();
RenderMiddleware.on('mount', () => logger.debug('RenderMiddleware mounted'));

RenderMiddleware.use('/', function(request, response) {
  logger.debug(`Routing to '${request.path}'`);

  Router.run(routes, request.path, function(Handler, state) {
    logger.debug(`Rendering handler for '${request.path}'`);

    const handler = React.renderToString(<Handler />);
    const html = React.renderToStaticMarkup(<ApplicationLayout scripts={['application.js']} handler={handler} />);
    response.type('html').send('<!DOCTYPE html>'.concat(html));
  });
});

export default RenderMiddleware;
