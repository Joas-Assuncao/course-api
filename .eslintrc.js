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
    'no-console': 'off',
    indent: 'off',
    'class-methods-use-this': 'off',
    'import/order': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
  },
};
