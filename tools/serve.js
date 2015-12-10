const path = require('path');
const koa = require('koa');
const send = require('koa-send');
const staticCache = require('koa-static-cache');
const http = require('http');
const config = require('./config');

const app = koa();

// Send assets
const opt_cache = {
  prefix: '/assets',
  // maxAge: 5,
};
app.use(staticCache(path.resolve(`${config.buildDir}/assets`), opt_cache));

// Otherwise send index.html
const opt_other = {
  root: path.resolve(config.buildDir),
};
app.use(function* (next) {
  if (this.method == 'HEAD' || this.method == 'GET') {
    const _path = '/public/index.html';
    if (yield send(this, _path, opt_other)) return;
  }
  yield* next;
});

const port = config.port || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
