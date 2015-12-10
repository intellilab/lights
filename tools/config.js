const isProd = process.env.NODE_ENV === 'production';

const config = {
  isProd: isProd,
  port: process.env.LIGHTS_PORT || 8080,
  buildDir: isProd ? 'dist' : 'build',
  suffix: isProd ? '-[hash].min' : '',
};

module.exports = config;
