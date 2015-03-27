'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

class ApplicationHandler extends React.Component {
  render() {
    return (
      <div>
        <RouteHandler {...this.props} />
      </div>
    );
  }
}

export default ApplicationHandler;
