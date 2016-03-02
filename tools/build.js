import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import config from './config';

const compiler = webpack(webpackConfig);

if (config.isProd) {
  compiler.run(webpackRes);
} else {
  const server = new WebpackDevServer(compiler, {
    contentBase: config.outputPath,
    publicPath: config.publicPath,
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  });

  const port = config.port || 8080;
  server.listen(port, 'localhost', () => {
    console.log(`Serving at port ${port}...`);
  });
}

function webpackRes(err, stats) {
  console.log(`Build: ${stats.endTime - stats.startTime}ms`);
  if (stats.hasErrors()) {
    let errors = stats.toJson().errors;
    for (let err of errors)
      console.log(err);
  }
}
