import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/sveton/", // или /имя-репозитория/ для GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        catalog: resolve(__dirname, "catalog.html"),
        catalogSection: resolve(__dirname, "catalog-section.html"),
        catalogElement: resolve(__dirname, "catalog-element.html"),
        catalogElementDetail: resolve(__dirname, "catalog-element-detail.html"),
        services: resolve(__dirname, "services.html"),
      },
    },
  },
});
