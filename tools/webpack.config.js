import path from 'path';
import webpack from 'webpack';
import config from './config';
import revPlugin from './lib/rev.plugin';

export default {
  context: path.resolve(__dirname, '../src/assets'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, `../${config.buildDir}/assets`),
    filename: `[name]${config.suffix}.js`,
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      }, {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel',
        query: {
          presets: ['es2015'],
        }
      }
    ],
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime'],
  },
  plugins: [
    revPlugin,
    ...(config.isProd ? [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ] : []),
  ],
};
