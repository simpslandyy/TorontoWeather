const express = require("express");
const path = require("path");
const wpconfig = require('../webpack.config');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware')
const PORT = process.env.PORT || 5000;
const app = express();

wpconfig.mode = process.env.ENVIRONMENT;
// Ideally we want to serve different things depending
// on the environment, but for now this will do.
const compiled_webpack = webpack(wpconfig);

app.use(middleware(compiled_webpack, {
  publicPath  : wpconfig.output.publicPath,
  contentBase : path.resolve(__dirname, 'src'),
  stats       : 'normal',
}))

app.listen(PORT, () => {
  console.log(`Application is now listening on port: ${PORT} \n`);
  console.log(`Running in ENV: ${process.env.ENVIRONMENT}`);
});
