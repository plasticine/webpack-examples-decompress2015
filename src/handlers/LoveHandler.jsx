'use strict';

import React from 'react';
import loveSrc from './love';

class LoveHandler extends React.Component {
  render() {
    return (
      <div>
        <h1>Thanks!</h1>
        <img src={loveSrc} />
      </div>
    );
  }
}

export default LoveHandler;
