module.exports = {
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    rules: {
        'vue/html-indent': ['error', 4],
        indent: ['error', 4],
        // See https://stackoverflow.com/questions/52698733/eslint-insists-on-not-indenting-script-tag
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 1,
            ignores: [],
        }],
    },
    // See https://stackoverflow.com/questions/52698733/eslint-insists-on-not-indenting-script-tag
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
    extends: [
        'plugin:vue/vue3-recommended',
        'airbnb',
    ],
};
