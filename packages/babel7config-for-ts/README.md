# babel7config-for-tsx

**babel7config-for-tsx** is designed for compiling `.ts` and '.tsx'. It is based on `Babel7` and `core-js3`.

## Installation

**babel7config-for-tsx** needs babel-runtime, so your need to install them before installing **babel7config-for-tsx**.

```shell
$ npm install @babel/runtime @babel/runtime-corejs3 core-js regenerator-runtime
$ npx install-peerdeps -D babel7config-for-tsx
```

## Usage

To compile `.ts`, set babel config:

```json
{
  "extends": "babel7config-for-tsx"
}
```

To compile `.tsx`, set babel config:

```json
{
  "extends": "babel7config-for-tsx/tsx"
}
```

Then in your app entry file, add code like:

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// your ts code here
interface Params {...}
```

