'use strict';

module.exports = {
    env: {es6: true, node: true, mocha: true},
    extends: 'eslint:recommended',
    parserOptions: {sourceType: 'module', ecmaVersion: 8},
    rules: {
        indent: ['error', 4], 'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'], semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-var': ['error'],
    },
};
