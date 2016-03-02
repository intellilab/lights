import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './config';

export default {
  entry: {
    main: './src/assets/main.js',
  },
  output: {
    path: path.join(config.outputPath, 'assets'),
    publicPath: config.publicPath,
    filename: `[name]${config.isProd ? '-[chunkhash:8]' : ''}.js`,
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        include: path.resolve('src'),
        loader: 'vue',
      }, {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      inject: 'body',
      ... config.isProd ? {
        filename: '../index.html',
      } : {}
    }),
    ... config.isProd ? [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ] : [],
  ],
};
