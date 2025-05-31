const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                module: 'writable',
                require: 'readonly',
                global: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly'
            }
        },
        rules: {
            // Code style preferences
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],

            // Best practices for Node.js/Express
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ],
            'no-console': 'off', // Allow console.log in Node.js
            'no-undef': 'error',
            'no-var': 'error',
            'prefer-const': 'warn',

            // MongoDB/Express specific
            'no-throw-literal': 'error',
            'consistent-return': 'warn',
            'handle-callback-err': 'error',
            'no-mixed-requires': 'warn',

            // Code quality
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'brace-style': ['error', '1tbs'],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'eol-last': 'error',

            // Async/await best practices
            'no-async-promise-executor': 'error',
            'no-await-in-loop': 'warn',
            'prefer-promise-reject-errors': 'error'
        },
        ignores: ['node_modules/**', 'dist/**', 'build/**', '*.min.js']
    }
];
