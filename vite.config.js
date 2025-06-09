import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/ымуещт", // или /имя-репозитория/ для GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "catalog.html"),
      },
    },
  },
});
