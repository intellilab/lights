import path from 'path';
import fs from 'fs';
import config from '../config';

const assets = {
  jsMain: `/assets/main${config.suffix}.js`,
};

const dirs = {
  src: '../../src/public',
  dest: `../../${config.buildDir}/public`,
};

function revPlugin() {
  this.plugin('done', function (stats) {
    function replaceStats(name) {
      return name.replace(/\[\s*(\S+)\s*\]/g, (match, group1) => {
        return stats[group1] || match;
      });
    }

    function replaceVariables(data) {
      return data.replace(/\{\{\s*(\S+)\s*\}\}/g, (match, group1) => {
        return replaceStats(assets[group1] || match);
      });
    }

    function readFile(callback) {
      fs.readFile(
        path.resolve(__dirname, dirs.src, 'index.html'),
        'utf8',
        function (err, data) {
          if (err) throw err;
          callback(data);
        }
      )
    }

    function makeDirs(dir, callback) {
      // TODO ensure parent directories
      fs.mkdir(dir, function (err) {
        // if (err) throw err;
        callback();
      });
    }

    function writeFile(data) {
      const dir = path.resolve(__dirname, dirs.dest);
      makeDirs(dir, function () {
        fs.writeFile(
          path.join(dir, 'index.html'),
          data,
          'utf8'
        );
      });
    }

    console.log('Write templates...');
    readFile(function (data) {
      writeFile(replaceVariables(data));
    });
  });
}

export default revPlugin;
