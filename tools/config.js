import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

export default {
  isProd,
  port: process.env.LIGHTS_PORT || 8080,
  outputPath: path.resolve('dist'),
  publicPath: isProd ? 'assets/' : '/',
};
