module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    quotes: [2, "double"],
    "consistent-return": 'off',
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "allowForLoopAfterthoughts": true
  },
};
