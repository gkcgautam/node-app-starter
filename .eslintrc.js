const path = require('path');

module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended",
    ],
    "plugins": [
        // "import"
    ],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "settings": {
        // "import/resolver": {
        //     "alias": {
        //         "map": [
        //             ['@core', './server/core'],
        //         ],
        //     },
        // },
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0,
        "no-process-exit": 1,
        "node/no-missing-require": 0,
        "no-unused-vars": 1,
    }
};
