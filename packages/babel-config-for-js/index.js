module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: 'defaults'
      },
    ],
  ],
  plugins: [
    [
      '@babel/transform-runtime',
      {
        corejs: 3,
      },
    ],
    [
      '@babel/proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
  ],
};
