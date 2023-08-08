module.exports = {
  parser: 'vue-eslint-parser',
  'parserOptions': {
      'parser': '@babel/eslint-parser',
      'requireConfigFile': false,
      'ecmaVersion': 6,
      'sourceType': 'module',
      "ecmaFeatures": {
          "jsx": true,
          "modules": true,
          "experimentalObjectRestSpread": true
      }
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    'array-bracket-spacing': 0,
    'array-callback-return': 2,
    'camelcase': 0,
    'class-methods-use-this': 0,
    'comma-dangle': 0,
    'comma-style': [2, 'last'],
    'curly': 0,
    'dot-notation': 0,
    'eol-last': 0,
    'eqeqeq': [2, 'allow-null'],
    'guard-for-in': 0,
    "indent": 0,

    'jsx-quotes': [2, 'prefer-double'],

    'key-spacing': 0,
    'new-cap': 0,

    'no-bitwise': 0,
    'no-caller': 2,
    'no-cond-assign': [2, 'except-parens'],
    'no-debugger': 2,
    'no-empty': 2,
    'no-empty-function': 2,
    'no-func-assign': 2,
    'no-lone-blocks': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-parens': 0,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-loop-func': 2,
    'no-multi-spaces': 0,
    'no-multi-str': 2,
    'no-multiple-empty-lines': 2,
    'no-new': 0,
    'no-plusplus': 0,
    'no-proto': 2,
    'no-script-url': 2,
    'no-sequences': 2,
    'no-shadow': 2,
    'no-undef': 2,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    'no-var': 2,
    'no-with': 2,
    'no-redeclare': 2,
    'no-self-assign': ['error', { 'props': true }],
    'no-mixed-spaces-and-tabs': 0,

    'no-useless-constructor': 2,
    'no-useless-rename': ['error', {
        'ignoreDestructuring': true,
        'ignoreImport': true,
        'ignoreExport': true
    }],
    'no-template-curly-in-string': 2,

    'prefer-const': 0,
    'generator-star-spacing': ['error', { 'before': true, 'after': true }],
    'no-const-assign': 2,
    'no-empty-pattern': 2,
    'prefer-arrow-callback': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'prefer-template': 0,
    'template-curly-spacing': ['error', 'never'],
    'yield-star-spacing': 2,

    'object-curly-spacing': [2, 'always'],
    'quotes': 0,
    'quote-props': 0,
    "prefer-rest-params": 0,
    'semi-spacing': 0,
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': 0,
    'strict': 0,
    'valid-typeof': 2,
    'vue/multi-word-component-names': 'off',
    'wrap-iife': [2, 'inside']
  }
}
