module.exports = {
  "extends": ["eslint:recommended"],
  "rules": {
    "indent": ["error", 2],
    "no-console": ["error", {
      "allow": ["warn", "error", "info"]
    }],
    // "linebreak-style": ["warn", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "souceType": "script"
  },
  "globals": {
    "window": true
  },
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": true
  }
};
