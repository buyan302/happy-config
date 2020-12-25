const createConfig = require('./src');

process.env.NODE_ENV = 'production';

const config = createConfig({
  mode: process.env.NODE_ENV,
  appBuild: './dist',
  appEntry: './test/index.js',
  appSrc: 'test',
  appHtml: './test/public/index.html',
});

config.externals = ['react', 'react-dom'];

module.exports = config;
