import React, { Fragment } from 'react';
import { StaticRouter } from 'react-router-dom';
import Routes from '../Routes';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (req, store, context) => {
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <Fragment>{renderRoutes(Routes)}</Fragment>
      </StaticRouter>
    </Provider>
  );

  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name='description' content='Wabomba Bakar Sofware Engineer And Web Developer Portfolio'/>
      <meta name='author' content='Wabomba Bakar' />
      <meta property='og:title' content='Wabomba Bakar : Software Engineer And Web Developer'/>
      <meta property='og:description' content='Wabomba Bakar : Software Engineer And Web Developer'  />
      <meta property='og:image' content='' />
      <meta name='format-detection' content='telephone=no' />
      <link href="favicon.png" rel="icon" type="image/png">
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Gaegu" rel="stylesheet">
      <title>Wabomba Bakar | Professional Software Engineer from East Africa</title>
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${markup}</div>
    </body>
    </html>`;
};
