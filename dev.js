const webpack = require('webpack');
const config = require('./webpack.config');

config.mode = 'development';
config.plugins[0] = new webpack.HotModuleReplacementPlugin();
config.optimization = null;
config.devServer = {
  hot: true,
  open: true,
  host: 'localhost',
  compress: true,
  inline: true,
  port: 2020,
  stats: {
    children: false,
    modules: false,
  }
};

module.exports = config;