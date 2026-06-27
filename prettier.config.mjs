/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  semi: false,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "auto",
  importOrder: [
    "react",
    "^react-.*$",
    "^next",
    "^next-.*$",
    "^next/.*$",
    "^@rightbrainai/.*$",
    "^.*/hooks/.*$",
    "^.*/services/.*$",
    "^.*/utils/.*$",
    "^.*/types/.*$",
    "^.*/pages/.*$",
    "^.*/components/.*$",
    "^[./]",
    ".*",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  tailwindFunctions: ["cva"],
  tailwindAttributes: ["containerClasses"],
  importOrderParserPlugins: ["typescript", "jsx"],
  tailwindStylesheet: "./app/globals.css",
}

export default config
