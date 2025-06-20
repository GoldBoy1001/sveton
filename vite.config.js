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
        servicesDetail: resolve(__dirname, "services-detail.html"),
        servisy: resolve(__dirname, "servisy.html"),
        lightingCalculator: resolve(__dirname, "lighting-calculator.html"),
        automaticSwitching: resolve(__dirname, "automatic-switching.html"),
        individualDesign: resolve(__dirname, "individual-design.html"),
        portfolio: resolve(__dirname, "portfolio.html"),
        portfolioDetail: resolve(__dirname, "portfolio-detail.html"),
        distributor: resolve(__dirname, "distributor.html"),
        decorativeLighting: resolve(__dirname, "decorative-lighting.html"),
      },
    },
  },
});
