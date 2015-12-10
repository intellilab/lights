import webpack from 'webpack';
import {ncp} from 'ncp';
import del from 'del';
import config from './config';
import webpackConfig from './webpack.config';

const compiler = webpack(webpackConfig);
const copy = (src, dest) => new Promise((resolve, reject) => {
  ncp(src, dest, (err) => err ? reject(err) : resolve());
});

/*async function copyAssets() {
  console.log('Copy assets...');
  console.time('Copy');
  await Promise.all([
    copy('src/public', `${config.buildDir}/public`),
  ]);
  console.timeEnd('Copy');
}*/

function webpackRes(err, stats) {
  console.log(`Build: ${stats.endTime - stats.startTime}ms`);
  if (stats.hasErrors()) {
    let errors = stats.toJson().errors;
    for (let err of errors)
      console.log(err);
  }
}

function build() {
  if (config.isProd) {
    console.log('Build and compress...');
    compiler.run(webpackRes);
  } else {
    console.log('Build and watch...');
    compiler.watch({
      aggregateTimeout: 300,
      poll: true,
    }, webpackRes)
  }
}

(config.isProd ? del('dist') : Promise.resolve()).then(build);
// copyAssets();
