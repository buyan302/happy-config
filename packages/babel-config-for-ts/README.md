# babel-config-for-ts

**babel-config-for-ts** is designed for compiling `.ts` and '.tsx'. It is based on `Babel7` and `core-js3`.

## Installation

**babel-config-for-ts** needs babel-runtime, so your need to install them before installing **babel-config-for-ts**.

```shell
$ npm install @babel/runtime @babel/runtime-corejs3 core-js regenerator-runtime
$ npx install-peerdeps -D babel-config-for-ts
```

## Usage

To compile `.ts`, set babel config:

```json
{
  "extends": "babel-config-for-ts"
}
```

To compile `.tsx`, set babel config:

```json
{
  "extends": "babel-config-for-ts/tsx"
}
```

Then in your app entry file, add code like:

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// your ts code here
interface Params {...}
```

