import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    includeSource: ["src/**/*.{ts,tsx}"],
    setupFiles: "src/test.setup.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/tests/**",
        "src/infrastructure/data/**",
        "src/main.tsx",
        "<rootDir>/node_modules/",
      ],
    },
  },
});
