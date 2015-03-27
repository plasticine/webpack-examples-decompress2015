'use strict';

import React from 'react';
import Router from 'react-router';
import routes from 'routes';

if (__DEV__) {
  global.React = React;
}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler />, document.getElementById('Application'));
});
