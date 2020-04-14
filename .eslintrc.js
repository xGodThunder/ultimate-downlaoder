module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "plugin:react/recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi":"error",
        "quotes":[
            "warn",
            "double"
        ],
            "no-trailing-spaces":"warn",
            "no-multi-spaces":"warn",
            "no-alert":"error",
            "indent":[2,"tab"]
        
    }
};