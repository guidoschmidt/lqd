import { defineConfig } from "vite";
import path from "path";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  resolve: {
    alias: {
      "doug.ui": path.resolve(__dirname, "../../src/lib.ts"),
    },
  },
  plugins: [
    solidPlugin({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties"],
        ],
      },
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
