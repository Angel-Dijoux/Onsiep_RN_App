module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "react-hooks",
    "react-native",
    "unused-imports",
  ],
  rules: {
    "no-console": "off",
    "no-param-reassign": "error",
    "no-var": "error",
    "no-redeclare": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".tsx"] }],
    "react/prop-types": "off",
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "import/no-duplicates": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-default-export": "warn",
    "import/no-mutable-exports": "error",
    "import/order": [
      "warn",
      {
        pathGroups: [
          {
            pattern: "$*/**",
            group: "parent",
            position: "before",
          },
        ],
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "index", "sibling"],
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "import/first": "error",
    "spaced-comment": [
      "error",
      "always",
      {
        line: {
          markers: ["/"],
        },
        block: { balanced: true },
      },
    ],
    "react-native/no-unused-styles": "error",
    "react-native/no-color-literals": "warn",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [
          {
            char: ">",
            alternatives: ["&gt;"],
          },
        ],
      },
    ],
    "unused-imports/no-unused-imports": "error",
  },
  settings: {
    "import/ignore": ["node_modules/react-native/index\\.js$"],
    react: {
      version: "detect",
    },
  },
};
