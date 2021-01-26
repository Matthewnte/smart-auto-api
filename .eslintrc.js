const { platform } = require('os');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'pug',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', platform() === 'linux' ? 'unix' : 'windows'],
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
  },
};
