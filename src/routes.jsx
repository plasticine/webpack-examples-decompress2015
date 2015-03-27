'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import ApplicationHandler from 'handlers/ApplicationHandler';
import DashboardHandler from 'handlers/DashboardHandler';
import ProfileHandler from 'handlers/ProfileHandler';
import ActivityHandler from 'handlers/ActivityHandler';
import LoveHandler from 'handlers/LoveHandler';

const routes = (
  <Route name="Dashboard" path="/" handler={ApplicationHandler}>
    <DefaultRoute handler={DashboardHandler} />

    <Route name="Profile" path="profile" handler={ ProfileHandler } />
    <Route name="Activity" path="activity" handler={ ActivityHandler } />
    <Route name="Love" path="love" handler={ LoveHandler } />
  </Route>
);

export default routes;
