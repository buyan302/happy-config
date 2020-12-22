const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  minimizer: [new TerserPlugin()],

  splitChunks: {
    cacheGroups: {
      vendors: {
        priority: -10,
        test: /[\\/]node_modules[\\/]/,
      },
    },

    chunks: 'async',
    minChunks: 1,
    minSize: 30000,
    name: false,
  },
};
