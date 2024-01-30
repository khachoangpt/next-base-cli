#! /bin/sh

projectName=$1
if [ -z $projectName ]
  then
    projectName=ui-base
fi

# Create project
pnpm create next-app $projectName --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm 

# Go to project folder
cd ./$projectName

# Install dependencies
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-simple-import-sort lint-staged husky @commitlint/config-conventional @commitlint/cli

eslintrc='{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "@typescript-eslint",
    "simple-import-sort",
    "eslint-plugin-prettier"
  ],
  "rules": {
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/first": "error",
    "no-console": "error"
  }
}'

echo "$eslintrc" > .eslintrc.json

prettierrc='{
  "semi": false,
  "trailingComma": "all",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}'

echo "$prettierrc" > .prettierrc

lintstagedrc='{
  "**/*.(ts|tsx|js)": ["pnpm eslint --fix", "pnpm prettier --write"],
  "**/*.(md|json)": "pnpm prettier --write"
}
'

echo "$lintstagedrc" > .lintstagedrc

git init

pnpm exec husky init

echo "pnpm lint-staged\npnpm tsc --noEmit" > .husky/pre-commit

commitlint='{
  "extends": ["@commitlint/config-conventional"]
}'

echo "$commitlint" > .commitlintrc.json

echo "pnpm --no-install commitlint --edit "\$1"" > .husky/commit-msg