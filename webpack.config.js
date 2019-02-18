const path = require('path');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')]
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new webpack.HashedModuleIdsPlugin() // 根据模块的相对路径生成 HASH 作为模块ID
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all', // 默认 async 可选值 all 和 initial
      maxInitialRequests: Infinity, // 一个入口最大的并行请求数
      minSize: 0, // 避免模块体积过小被忽略
      minChunks: 1, // 表示最小引用次数
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(mod) { 
            const packageName = mod.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm-vendors/${packageName}`; 
          }
        }
      }
    }
  },
  stats: {
    children: false,
    modules: false
  }
};