import React, { Fragment } from 'react';
import { StaticRouter } from 'react-router-dom';
import Routes from '../Routes';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (req, store, context) => {
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <Fragment>{renderRoutes(Routes)}</Fragment>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <!doctype html>
    <html lang="en">
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="favicon.png" rel="icon" type="image/png">
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Gaegu" rel="stylesheet">
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
