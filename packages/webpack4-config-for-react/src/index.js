const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const webpack = require('webpack');
const postcssNormalize = require('postcss-normalize');
const postcssFlexBugs = require('postcss-flexbugs-fixes');

const postcssPreset = require('postcss-preset-env');
const safePostCssParser = require('postcss-safe-parser');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient',
);
const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop',
);
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const root = process.cwd();
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const hasJsxRuntime = function () {
  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
};

const resolvePaths = (paths) => paths.map(
  (p) => p && path.resolve(root, p),
);

// get common style loader
const createStyleLoaderFunc = ({
  publicPath,
  appSrc,
  isDev,
  useSourceMap,
}) => (cssOptions, preProcessor) => {
  const loaders = [
    isDev && require.resolve('style-loader'),
    !isDev && {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: useSourceMap,
        ...cssOptions,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          postcssFlexBugs,
          postcssPreset({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
        sourceMap: useSourceMap,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: useSourceMap,
          root: appSrc,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    );
  }
  return loaders;
};

module.exports = (
  {
    appName = 'app',
    // webpack internal config
    mode = 'development',
    publicPath = './',
    // app path config
    appRoot = '.',
    appSrc = './src',
    appEntry = './src/index.js',
    appBuild = './dist',
    appPkgJson = './package.json',
    appNodeModules = './node_modules',
    appHtml = './public/index.html',
    appTsConfig = './tsconfig.json',
    swSrc = 'src/service-worker',
    // feature config
    useReactRefresh = false,
    useSourceMap = false,
    useTypescript = false,
    useTsCheck = false,
    useInlineRuntimeChunk = true,
    // loader & plugin config
    imageInlineSizeLimit = '10000',
    interpolateHtmlPlugin = { PUBLIC_URL: './' },
    definePlugin = {},
    forkTsCheckerWebpackPlugin = {
      reportFiles: [
        '../**/src/**/*.{ts,tsx}',
        '**/src/**/*.{ts,tsx}',
        '!**/src/**/__tests__/**',
        '!**/src/**/?(*.)(spec|test).*',
      ],
    },
  } = {},
) => {
  const isDev = mode === 'development';
  const isEnvProductionProfile = !isDev && process.argv.includes('--profile');
  const getStyleLoaders = createStyleLoaderFunc({
    publicPath, isDev, appSrc, useSourceMap,
  });
  // eslint-disable-next-line no-param-reassign
  [appRoot, appSrc, appEntry, appBuild, appPkgJson, appNodeModules, appHtml, appTsConfig] =
    // eslint-disable-next-line max-len
    resolvePaths([appRoot, appSrc, appEntry, appBuild, appPkgJson, appNodeModules, appHtml, appTsConfig]);

  return {
    mode,
    bail: !isDev,
    devtool: useSourceMap && (isDev ? 'cheap-module-source-map' : 'source-map'),
    entry: isDev && !useReactRefresh ? [
      webpackDevClientEntry,
      appEntry,
    ] : appEntry,
    output: {
      path: isDev ? undefined : appBuild,
      pathinfo: isDev,
      filename: isDev ? 'static/js/bundle.js' : 'static/js/[name].[contenthash:8].js',
      futureEmitAssets: true,
      chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js',
      publicPath,
      devtoolModuleFilenameTemplate: isDev
        ? (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
        : (info) => path
          .relative(appSrc, info.absoluteResourcePath)
          .replace(/\\/g, '/'),
      jsonpFunction: `webpackJsonp${appName}`,
      globalObject: 'this',
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: useSourceMap,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: useSourceMap
              && {
                inline: false,
                annotation: true,
              },

          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    resolve: {
      modules: ['node_modules'],
      extensions: [
        'web.mjs',
        'mjs',
        'web.js',
        'js',
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'json',
        'web.jsx',
        'jsx',
      ]
        .map((ext) => `.${ext}`)
        .filter((ext) => useTypescript || !ext.includes('ts')),
      alias: {

        'react-native': 'react-native-web',
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
      },
      plugins: [
        PnpWebpackPlugin,
        new ModuleScopePlugin(appSrc, [
          appPkgJson,
          reactRefreshOverlayEntry,
        ]),
      ],
    },

    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: [/\.avif$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                mimetype: 'image/avif',
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides',
                ),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: hasJsxRuntime() ? 'automatic' : 'classic',
                    },
                  ],
                ],

                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                  isDev
                    && useReactRefresh
                    && require.resolve('react-refresh/babel'),
                ].filter(Boolean),

                cacheDirectory: true,

                cacheCompression: false,
                compact: !isDev,
              },
            },

            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: useSourceMap,
                inputSourceMap: useSourceMap,
              },
            },

            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              }),
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                },
                'sass-loader',
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'sass-loader',
              ),
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        {

          inject: true,
          template: appHtml,
          ...(isDev || {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }),
        },
      ),
      useInlineRuntimeChunk
        && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, interpolateHtmlPlugin),
      new ModuleNotFoundPlugin(appRoot),
      new webpack.DefinePlugin(definePlugin),
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev
        && useReactRefresh
        && new ReactRefreshWebpackPlugin({
          overlay: {
            entry: webpackDevClientEntry,

            module: reactRefreshOverlayEntry,

            sockIntegration: false,
          },
        }),
      isDev && new CaseSensitivePathsPlugin(),

      isDev
        && new WatchMissingNodeModulesPlugin(appNodeModules),
      !isDev
        && new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            // eslint-disable-next-line no-param-reassign
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith('.map'),
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      !isDev
        && fs.existsSync(swSrc)
        && new WorkboxWebpackPlugin.InjectManifest({
          swSrc,
          dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
          exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        }),
      // TypeScript type checking
      useTypescript && useTsCheck
        && new ForkTsCheckerWebpackPlugin({
          typescript: resolve.sync('typescript', {
            basedir: appNodeModules,
          }),
          async: isDev,
          checkSyntacticErrors: true,
          // resolveModuleNameModule: process.versions.pnp
          //   ? `${__dirname}/pnpTs.js`
          //   : undefined,
          // resolveTypeReferenceDirectiveModule: process.versions.pnp
          //   ? `${__dirname}/pnpTs.js`
          //   : undefined,
          tsconfig: appTsConfig,
          silent: true,
          formatter: isDev ? undefined : typescriptFormatter,
          ...forkTsCheckerWebpackPlugin,
        }),
    ].filter(Boolean),
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    performance: false,
  };
};
