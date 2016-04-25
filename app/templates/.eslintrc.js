module.exports = {
  root: true,
  extends: 'airbnb/base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "semi": [2, "never"],
    "no-console": [0],
    "space-before-function-paren": [2, "always"],
    "prefer-const": [0],
    "eol-last": [0],
    "no-param-reassign": [0],
    "no-shadow": [1],
    "arrow-body-style": [0]
  }
}
