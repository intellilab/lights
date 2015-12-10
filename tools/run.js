require('babel-core/register');
require('babel-polyfill');

var flag;
process.argv.forEach((arg) => {
  if (flag === '-r') {
    flag = null;
    require(arg);
  } else if (['-r'].includes(arg)) {
    flag = arg;
  }
});
