module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "no-unused-vars": "off", //!!!!! POUR NE PAS METTRE DES LIGNES ROUGES SOUS CHAQUE VAR INUTILISEE
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/no-unescaped-entities": "off", //Pour enlever les soulignements rouges quand j'écris des apostrophes
    "react/prop-types": "off", //Pour enlever les soulignements rouges dans les props
  },
  globals: {
    require: "readonly", // Reconnaître 'require' comme une variable globale en lecture seule
  },
};
