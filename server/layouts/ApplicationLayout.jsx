'use strict';

import React from 'react';

class ApplicationLayout extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <title>Hi Decompress!</title>
        </head>
        <body>
          <div id="Application" dangerouslySetInnerHTML={{__html: this.props.handler}} />
          {this.props.scripts.map(this.renderScriptTag)}
        </body>
      </html>
    );
  }

  renderScriptTag(src) {
    let devserverSrc = `//127.0.0.1:${process.env.DEVSERVER_PORT}/${src}`;
    return (
      <script src={devserverSrc} charSet="utf-8" key={src} />
    );
  }
}

ApplicationLayout.propTypes = {
  handler: React.PropTypes.node.isRequired,
  scripts: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default ApplicationLayout;
