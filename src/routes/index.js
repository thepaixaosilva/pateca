const express = require('express');
const userRoute = require('./user.routes');
// const docsRoute = require('./docs.route');
const { config } = require('../config/environment.config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  //   {
  //     path: '/docs',
  //     route: docsRoute,
  //   },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
