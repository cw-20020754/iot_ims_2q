module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ["react-app", "plugin:react/recommended"],
    rules: {
        "react/jsx-filename-extension": [1, { extensions: ["js", "jsx"] }],
        "no-unused-vars": ["off"],
        "no-console": ["off"],
        "import/prefer-default-export": ["off"],
        "react-hooks/exhaustive-deps": ["warn"],
        "react/jsx-props-no-spreading": ["off"],
        "react/prop-types": ["off"],
        "no-underscore-dangle": ["off"],
        "no-param-reassign": ["off"],
        "react/jsx-wrap-multilines": ["off"],
        "linebreak-style": ["error"],
        "arrow-body-style": 0,
        quotes: ["off", "single"],
        indent: ["off", 2, { ignoredNodes: ["JSXElement"] }],
        "no-multiple-empty-lines": [1, { max: 1, maxEOF: 1 }],
        "jsx-a11y/label-has-associated-control": "off",
        "max-len": "off",
        "arrow-parens": ["warn", "always"],
    },
    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: ["node_modules", ".", "src"],
            },
        },
    },
};
