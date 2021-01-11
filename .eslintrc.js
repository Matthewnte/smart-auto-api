const { platform } = require('os');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
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
