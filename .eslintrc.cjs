module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react-refresh', 'react-hooks', ],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
  },
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  overrides: [{
    files: ['**/*.jsx', '**/*.tsx'],
    rules: {
      "react/no-danger": "warn",
      "react/jsx-no-bind": "off", // This is a performance optimization, not a correctness issue.
      "react/jsx-no-useless-fragment": "error",
      "react/display-name": "error",
      "react/button-has-type": ["error"],
      "react/no-array-index-key": "error",
      "react/prop-types": ["error"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/self-closing-comp": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-undef": "error",
      "react/no-unused-state": "error",
      "react-refresh/only-export-components": [
        'warn',
        { allowConstantExport: true },
      ],
    }
  }],
}
