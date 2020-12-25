# webpack4-config-for-react

**webpack4-config-for-react** is designed for different kinds of web app. It is based on [create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js), but it's more flexible.

## Installation

```shell
$ npx install-peerdeps -D webpack4-config-for-react
```

## Usage

```js
const createReactConfig = require('webpack4-config-for-react')

const config = createReactConfig({
  mode = process.env.NODE_ENV
})
```

## API

### `createReactConfig.options`:

- webpack internal config

|name|type|default|description
|-----|-----|-----|-----|
|mode|string|'development'| see [webpack mode](https://v4.webpack.js.org/concepts/#mode)
|publicPath|string|'./'|see [webpack publicPath](https://webpack.js.org/guides/public-path/#root)

- app path config

|name|type|default|description
|-----|-----|-----|-----|
|appRoot|string|'.'|the application's root dir
|appSrc|string|'./src'|source code dir
|appEntry|string|'./src/index.js'|source code entry file
|appBuild|string|'./dist'|output dir after bundling
|appPkgJson|string|'./package.json'|`package.json` file path
|appNodeModules|string|'./node_modules'|dependency's dir
|appHtml|string|'./public/index.html'|the application's html file
|appTsConfig|string|'./tsconfig.json'|`tsconfig.json` file path
|swSrc|string|'./src/service-worker'|service worker dir

- feature config

|name|type|default|description
|-----|-----|-----|-----|
|useReactRefresh|boolean|false|whether or not use [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
|useSourceMap|boolean|false|whether or not use sourceMap
|useTypescript|boolean|false|whether or not use typescript
|useTsCheck|boolean|false|whether or not check ts type
|useInlineRuntimeChunk|boolean|true|whether or not use [react-dev-utils/InlineChunkHtmlPlugin](https://www.npmjs.com/package/react-dev-utils#new-inlinechunkhtmlpluginhtmlwebpackplugin-htmlwebpackplugin-tests-regex)

- loader & plugin config

|name|type|default|description
|-----|-----|-----|-----|
|imageInlineSizeLimit|string|'10000'|image inline size limit, see [url-loader limit](https://www.npmjs.com/package/url-loader#limit)
|interpolateHtmlPlugin|object|`{ PUBLIC_URL: './' }`|[` new InterpolateHtmlPlugin(HtmlWebpackPlugin, interpolateHtmlPlugin)`](https://www.npmjs.com/package/react-dev-utils#new-interpolatehtmlpluginhtmlwebpackplugin-htmlwebpackplugin-replacements-keystring-string)
|definePlugin|object|`{}`|[DefinePlugin](https://webpack.js.org/plugins/define-plugin/) params
|forkTsCheckerWebpackPlugin|object|`{reportFiles: ['../**/src/**/*.{ts,tsx}','**/src/**/*.{ts,tsx}','!**/src/**/__tests__/**','!**/src/**/?(*.)(spec\|test).*',]}`|[react-dev-utils/ForkTsCheckerWebpackPlugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin) params, only valid when `useTypescript` and `useTsCheck` are enabled

- other

|name|type|default|description
|-----|-----|-----|-----|
|appName|string|'app'|the application's name

## Caveats

You have to set `process.env.NODE_ENV` by yourself, cause `babel` needs `process.env.NODE_ENV` not `undefined`.




