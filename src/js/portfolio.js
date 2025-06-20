export function portfolioTabs() {
  document.querySelectorAll(".portfolio-index__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".portfolio-index__tab")
        .forEach((t) => t.classList.remove("portfolio-index__tab-active"));
      tab.classList.add("portfolio-index__tab-active");
    });
  });
}
