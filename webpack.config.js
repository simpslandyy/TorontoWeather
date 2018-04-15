const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;
const CLIENT_PATH = HOST + ":" + PORT;

module.exports = {
  entry: [
    './src/app.js',
  ],
  module: {
    rules: [
      {
        test: /\.(|svg|ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
      test: /\.(css|sass|scss)$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      } , {
        loader: "postcss-loader",
        options: {
          plugins: function () {
            return [
              require('precss'),
              require('autoprefixer')
            ];
          }
        }
      }
    ]
  }]
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  target: 'node',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: true
    })
  ]
};

// Probably won't need but I'll keep it here just in case
// new webpack.ProvidePlugin({ // inject ES5 modules as global vars
//   $: 'jquery',
//   jQuery: 'jquery',
//   'window.jQuery': 'jquery',
//   Tether: 'tether'
// })
