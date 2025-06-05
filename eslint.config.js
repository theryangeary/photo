export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                customElements: "readonly",
                HTMLElement: "readonly",
                Element: "readonly",
                MediaQueryList: "readonly",
                Event: "readonly",
                Image: "readonly",
                setTimeout: "readonly",
                requestAnimationFrame: "readonly"
            }
        },
        rules: {
            "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "no-console": "warn",
            "prefer-const": "error",
            "no-var": "error",
            "eqeqeq": "error",
            "curly": "error",
            "no-trailing-spaces": "error",
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "semi": ["error", "always"]
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                jest: "readonly"
            }
        }
    }
];