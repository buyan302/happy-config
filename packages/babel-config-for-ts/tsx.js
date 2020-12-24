module.exports = {
  extends: require.resolve('./index.js'),
  overrides: [{
    presets: [
      ['@babel/preset-typescript',
        { isTSX: true, allExtensions: true, allowDeclareFields: true }],
    ],
  }],
};
