const hasJsxRuntime = function () {
  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  extends: 'babel7-config-for-js',
  overrides: [{
    presets: [['@babel/preset-react', {
      runtime: hasJsxRuntime ? 'automatic' : 'classic',
    }]],
    plugins: hasJsxRuntime() ? undefined : [
      'transform-react-jsx-self',
      'transform-react-jsx-source',
    ],
  }],
};
