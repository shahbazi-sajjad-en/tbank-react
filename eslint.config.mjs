import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // تنظیمات پیش‌فرض Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore ها
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // قوانین دلخواه
  {
    rules: {
      complexity: "off",                        // ⬅️ هشدار complexity غیرفعال
      "no-unused-vars": "off",                  // ⬅️ هشدار unused vars خاموش
      "@typescript-eslint/no-unused-vars": "off", // ⬅️ برای TypeScript
      "react/jsx-key": "off",                   // اگه نمی‌خوای JSX key هی اخطار بده
    },
  },
];

export default eslintConfig;
