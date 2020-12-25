const hasJsxRuntime = function () {
  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  extends: require.resolve('babel7config-for-js'),
  overrides: [{
    presets: [['@babel/preset-react', {
      runtime: hasJsxRuntime ? 'automatic' : 'classic',
    }]],
    plugins: hasJsxRuntime() ? undefined : [
      '@babel/plugin-transform-react-jsx-self',
      '@babel/plugin-transform-react-jsx-source',
    ],
  }],
};
