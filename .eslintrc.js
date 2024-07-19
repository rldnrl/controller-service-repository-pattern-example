module.exports = {
  root: true,
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
  },
};
