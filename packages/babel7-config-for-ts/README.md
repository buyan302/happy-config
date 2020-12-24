# babel7-config-for-ts

**babel7-config-for-ts** is designed for compiling `.ts` and '.tsx'. It is based on `Babel7` and `core-js3`.

## Installation

**babel7-config-for-ts** needs babel-runtime, so your need to install them before installing **babel7-config-for-ts**.

```shell
$ npm install @babel/runtime @babel/runtime-corejs3 core-js regenerator-runtime
$ npx install-peerdeps -D babel7-config-for-ts
```

## Usage

To compile `.ts`, set babel config:

```json
{
  "extends": "babel7-config-for-ts"
}
```

To compile `.tsx`, set babel config:

```json
{
  "extends": "babel7-config-for-ts/tsx"
}
```

Then in your app entry file, add code like:

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// your ts code here
interface Params {...}
```

