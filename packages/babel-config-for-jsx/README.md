# babel-config-for-jsx

**babel-config-for-jsx** is designed for compiling react `.jsx`. 

## Installation

**babel-config-for-jsx** needs babel-runtime, so your need to install them before installing **babel-config-for-jsx**.

```shell
$ npm install @babel/runtime @babel/runtime-corejs3 core-js regenerator-runtime
$ npx install-peerdeps -D babel-config-for-jsx
```

## Usage

Set babel config:

```json
{
  "extends": "babel-config-for-jsx"
}
```


## Caveats

**babel-config-for-jsx** will detect whether `react/jsx-runtime` exists, if exist, **babel-config-for-jsx** will set [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) `runtime='automatic'`;If not, **babel-config-for-jsx** will use [@babel/plugin-transform-react-jsx-self](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-self)
[@babel/plugin-transform-react-jsx-source](@babel/plugin-transform-react-jsx-source)
