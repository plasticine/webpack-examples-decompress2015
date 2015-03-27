'use strict';

import React from 'react';
import {Link} from 'react-router';

class NavigationComponent extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="Dashboard">Dashboard</Link></li>
          <li><Link to="Profile">Profile</Link></li>
          <li><Link to="Activity">Activity</Link></li>
          <li><Link to="Love">💖</Link></li>
        </ul>
      </nav>
    );
  }
}

export default NavigationComponent;
