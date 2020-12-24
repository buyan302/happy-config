# happy-config

**happy-config** is used for collecting common config of popular web frameworks, such as `webpack` `eslint` `babel` etc.

The purpose of this repo is simplifying application's dependencies and the configuration process so that developers can develop web application more quickly.

> Hate complicated config? Try happy-config, inherit it, extend it.

## Supported Config

- eslint
  - [x] [eslint-config-for-js](https://github.com/buyan302/happy-config/blob/main/packages/eslint-config-for-js/README.md)
  - [x] [eslint-config-for-ts](https://github.com/buyan302/happy-config/blob/main/packages/eslint-config-for-ts/README.md)
  - [x] [eslint-config-for-jsx](https://github.com/buyan302/happy-config/blob/main/packages/eslint-config-for-jsx/README.md)
  - [x] [eslint-config-for-tsx](https://github.com/buyan302/happy-config/blob/main/packages/eslint-config-for-tsx/README.md)

- babel
  - [x] [babel-config-for-js](https://github.com/buyan302/happy-config/blob/main/packages/babel-config-for-js/README.md)
  - [x] [babel-config-for-ts](https://github.com/buyan302/happy-config/blob/main/packages/babel-config-for-ts/README.md)
  - [ ] [babel-config-for-jsx](https://github.com/buyan302/happy-config/blob/main/packages/babel-config-for-jsx/README.md)
  - [ ] [babel-config-for-tsx](https://github.com/buyan302/happy-config/blob/main/packages/babel-config-for-tsx/README.md)

- webpack
  - [x] [webpack4-config-for-react](https://github.com/buyan302/happy-config/blob/main/packages/webpack4-config-for-react/README.md)

- jest
  - [ ] [jest-config-for-js]()
  - [ ] [jest-config-for-jsx]()
  - [ ] [jest-config-for-ts]()
  - [ ] [jest-config-for-tsx]()

- `.editorconfig`

You can copy the following code into your `.editorconfig` file

```yml
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## More Config?

Leave a issue [here](https://github.com/buyan302/happy-config/issues)
