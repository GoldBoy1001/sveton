import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/", // или /имя-репозитория/ для GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        catalog: resolve(__dirname, "catalog.html"),
        catalogSection: resolve(__dirname, "catalog-section.html"),
      },
    },
  },
});
