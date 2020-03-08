import { matchRoutes } from 'react-router-config';
import express from 'express';
import proxy from 'express-http-proxy';
import createStore from './server/createStore';
import renderer from './server/renderer';
import Routes from './Routes';

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(express.static('src/images'))
  .use('/api', proxy('http://localhost:5000'))
  .get('*', (req, res) => {
    const context = {};
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path)
      .map(({ route }) => (route.loadData ? route.loadData(store) : null))
      .map(
        promise =>
          promise &&
          new Promise((resolve, reject) => promise.then(resolve).catch(resolve))
      );

    Promise.all(promises)
      .then(() => {
        const content = renderer(req, store, context);
        if (context.url) return res.redirect(301, context.url);
        if (context.notFound) res.status(404);
        res.status(200).send(content);
      })
      .catch(ex => console.log(ex));
  });

export default server;
