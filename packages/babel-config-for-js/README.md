# babel-config-for-js

**babel-config-for-js** is designed for compiling `commonjs` and `esm`. It is based on `Babel7` and `core-js3`.

## Installation

**babel-config-for-js** needs babel runtime, so your need to install them before installing **babel-config-for-js**.

```shell
$ npm install @babel/runtime @babel/runtime-corejs3 core-js regenerator-runtime
$ npx install-peerdeps -D babel-config-for-js
```

## Usage

Set babel config:

```json
{
  "extends": ["babel-config-for-js"]
}
```

Then in your app entry file, add code like:

```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// your code here
```

