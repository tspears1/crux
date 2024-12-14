import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    deno(),
  ],
  build: {
    lib: {
      entry: "src/components/index.js",
      name: "BUCL",
      fileName: (format) => `index.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
