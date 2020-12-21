module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ['prettier'],
  plugins: ['babel'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
};
