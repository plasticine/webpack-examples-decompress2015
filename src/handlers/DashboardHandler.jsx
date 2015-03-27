'use strict';

import React from 'react';
import NavigationComponent from 'components/NavigationComponent';

class DashboardHandler extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <hr />
        <NavigationComponent />
      </div>
    );
  }
}

export default DashboardHandler;
