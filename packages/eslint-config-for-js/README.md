# eslint-config-for-js

**eslint-config-for-js** is designed for `commonjs` and `esm`,it contains serveral popular js code styles: [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base),[standard](https://www.npmjs.com/package/eslint-config-standard),[google](https://www.npmjs.com/package/eslint-config-google),it's compatible with [prettier](https://www.npmjs.com/package/eslint-config-prettier).

## Installation

```shell
$ npx install-peerdeps -D eslint-config-for-js
```

## Usage


To use airbnb-base style, set eslint config:

```json
{
  "extends": ["for-js/airbnb"]
}
```

To use standard style, set eslint config:

```json
{
  "extends": ["for-js/standard"]
}
```

To use google style, set eslint config:

```json
{
  "extends": ["for-js/google"]
}
```


