const { set } = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// get common style loader
function getStyleLoaders(loaderOptions, preProcessor) {
  set(loaderOptions, 'cssLoader.options.importLoaders', preProcessor ? 3 : 1);
  const loaders = [
    {
      loader: 'css-loader',
      ...loaderOptions.cssLoader,
    }, {
      loader: 'postcss-loader',
      ...loaderOptions.postcssLoader,
    },
  ];

  // use style-loader in development
  if (loaderOptions.styleLoader) {
    loaders.unshift({ loader: 'style-loader', ...loaderOptions.styleLoader });
  }

  // use MiniCssExtractPlugin in production
  if (loaderOptions.miniCssLoader) {
    loaders.unshift({
      loader: MiniCssExtractPlugin.loader,
      ...loaderOptions.miniCssLoader,
    });
  }

  if (preProcessor) {
    loaders.push(
      {
        loader: 'resolve-url-loader',
        ...loaderOptions.resolveUrlLoader,
      },
      preProcessor,
    );
  }
}

// get css rule
function getCssRule(loaderOptions) {
  return {
    test: /\.css$/,
    use: getStyleLoaders(loaderOptions),
  };
}

// get less rule, use less-loader
function getLessRule(loaderOptions) {
  return {
    test: /\.less$/,
    use: getStyleLoaders(loaderOptions, loaderOptions.lessLoader),
  };
}

// get sass rule, use sass-loader
function getSassRule(loaderOptions) {
  return {
    test: /\.(scss|sass)$/,
    use: getStyleLoaders(loaderOptions, loaderOptions.sassLoader),
  };
}

module.exports = {
  getCssRule,
  getLessRule,
  getSassRule,
};
