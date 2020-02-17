module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'quotes': 0,
    'eol-last': 0,
    'keyword-spacing': 0,
    'no-trailing-spaces': 1,
    'no-return-assign': 0,
    'no-unused-expressions': 1
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
