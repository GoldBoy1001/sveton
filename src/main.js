import "./scss/style.scss";

async function loadSwiperIfNeeded() {
  const needsSwiper = document.querySelector(
    
    ".catalog-element-slider-thumbs, .catalog-element-slider-main, .my-slide, .portfolio-slides, .projects-portfolio-mobile, .portfolio-detail-slides"
  );
  if (!needsSwiper) return null;

  const [{ Swiper },] = await Promise.all([
    import("./js/swiper-bundle.min"),
    import("./scss/slider/swiper-bundle.min.css"),
  ]);
  return Swiper;
}

function markImagesLazy() {
  const images = Array.from(document.querySelectorAll("img"));
  images.forEach((img, index) => {
    if (!img.hasAttribute("loading")) {
      img.loading = index < 3 ? "eager" : "lazy";
    }
    if (!img.hasAttribute("decoding")) {
      img.decoding = "async";
    }
  });
}

function initMenu() {
  const menuItems = document.querySelectorAll(".menu-top__item-link");
  if (menuItems && menuItems.length) {
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuItems.forEach((i) => i.classList.remove("active-menu-item"));
        item.classList.add("active-menu-item");
      });
    });
  }
}

function initBurgerMenu() {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu__list a");
  if (!burger || !mobileMenu) return;

  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    burger.classList.toggle("open");
    document.body.classList.toggle("popup-open");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burger.classList.remove("open");
      document.body.classList.remove("popup-open");
    });
  });
}

function initCalculatorControls() {
  document
    .querySelectorAll(".lighting-calculator__control")
    .forEach((control) => {
      const input = control.querySelector(".dimension-input");
      const increment = control.querySelector(".btn-increment");
      const decrement = control.querySelector(".btn-decrement");
      if (!input || !increment || !decrement) return;

      increment.addEventListener("click", () => {
        input.value = (
          parseFloat(input.value) + parseFloat(input.step)
        ).toFixed(1);
        updateArea();
      });

      decrement.addEventListener("click", () => {
        const newValue = parseFloat(input.value) - parseFloat(input.step);
        if (newValue >= parseFloat(input.min)) {
          input.value = newValue.toFixed(1);
          updateArea();
        }
      });

      input.addEventListener("input", updateArea);
    });

  function updateArea() {
    const inputs = document.querySelectorAll(".dimension-input");
    const length = parseFloat(inputs[0]?.value) || 0;
    const width = parseFloat(inputs[1]?.value) || 0;
    const area = length * width;
    const areaEl = document.getElementById("area-value");
    if (areaEl) areaEl.textContent = Math.round(area);
  }

  document
    .querySelectorAll(".lighting-calculator__control")
    .forEach((control) => {
      const input = control.querySelector("input.lighting-input");
      const increment = control.querySelector(".btn-increment");
      const decrement = control.querySelector(".btn-decrement");

      increment?.addEventListener("click", () => {
        input.value = (
          parseFloat(input.value) + parseFloat(input.step)
        ).toFixed(1);
      });

      decrement?.addEventListener("click", () => {
        const newValue = parseFloat(input.value) - parseFloat(input.step);
        if (newValue >= parseFloat(input.min)) {
          input.value = newValue.toFixed(1);
        }
      });
    });
}

async function initSwipers() {
  const Swiper = await loadSwiperIfNeeded();
  if (!Swiper) return;

  const thumbsEl = document.querySelector(".catalog-element-slider-thumbs");
  const mainEl = document.querySelector(".catalog-element-slider-main");
  let catalogThumbs = null;
  if (thumbsEl) {
    catalogThumbs = new Swiper(".catalog-element-slider-thumbs", {
      spaceBetween: 10,
      slidesPerView: 3,
      watchSlidesProgress: true,
    });
  }
  if (mainEl) {
    new Swiper(".catalog-element-slider-main", {
      spaceBetween: 10,
      thumbs: catalogThumbs ? { swiper: catalogThumbs } : undefined,
      navigation: {
        nextEl: ".catalog-element-slide__prev",
        prevEl: ".catalog-element-slide__next",
      },
      pagination: { el: ".catalog-element-slider-main-pagination" },
    });
  }

  if (document.querySelector(".my-slide")) {
    new Swiper(".my-slide", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        320: { slidesPerView: 2.2, spaceBetween: 20 },
        769: { slidesPerView: 3.2, spaceBetween: 20 },
        1200: { slidesPerView: 4, spaceBetween: 30 },
      },
      navigation: {
        nextEl: ".products-slide__prev",
        prevEl: ".products-slide__next",
      },
    });
  }

  let swperPortfolio = null;
  if (document.querySelector(".portfolio-slides")) {
    swperPortfolio = new Swiper(".portfolio-slides", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".portfolio-slide__prev",
        prevEl: ".portfolio-slide__next",
      },
      on: {
        slideChange: function () {
          const activeIndex = this.activeIndex;
          const cards = document.querySelectorAll(".projects-portfolio__card");
          cards.forEach((card, index) => {
            card.classList.toggle("portfolio__card-active", index === activeIndex);
          });
        },
      },
    });
  }

  if (document.querySelector(".projects-portfolio-mobile")) {
    const projectNavSwiper = new Swiper(".projects-portfolio-mobile", {
      slidesPerView: 3.2,
      slidesPerGroup: 1,
      spaceBetween: 10,
      breakpoints: {
        320: { slidesPerView: 1.6, spaceBetween: 20 },
        510: { slidesPerView: 2, spaceBetween: 20 },
        800: { slidesPerView: 3, spaceBetween: 10 },
        900: { slidesPerView: 3.4, spaceBetween: 30 },
      },
      scrollbar: { el: ".swiper-scrollbar", draggable: true },
      on: {
        click: function (swiper) {
          const clickedIndex = swiper.clickedIndex;
          if (typeof clickedIndex !== "undefined" && swperPortfolio) {
            swperPortfolio.slideTo(clickedIndex);
            updateActiveNavSlide(clickedIndex);
          }
        },
      },
    });

    function updateActiveNavSlide(index) {
      const cards = document.querySelectorAll(
        ".projects-portfolio-mobile-slide"
      );
      cards.forEach((card, i) => {
        card.classList.toggle("projects-portfolio-mobile-slide-active", i === index);
      });
      projectNavSwiper.slideTo(index);
    }

    if (swperPortfolio) {
      swperPortfolio.on("slideChange", function () {
        const activeIndex = swperPortfolio.activeIndex;
        updateActiveNavSlide(activeIndex);
      });
    }
  }

  if (document.querySelector(".portfolio-detail-slides")) {
    new Swiper(".portfolio-detail-slides", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".portfolio-detail-slide__prev",
        prevEl: ".portfolio-detail-slide__next",
      },
      pagination: {
        el: ".portfolio-detail-pagination",
        dynamicBullets: true,
        clickable: true,
      },
    });
  }
}

async function initFeatureModules() {
  const needsLightingCalculator = document.querySelector(
    ".lighting-calculator, .lighting-calculator__control, .lighting-calculator__submit"
  );
  if (needsLightingCalculator) {
    const lightingModule = await import("./js/lightingParameters");
    lightingModule.lightingParameters?.();
    lightingModule.disabledBtn?.();
    lightingModule.popupCalculationAlgorithm?.();
    lightingModule.popupSelectingLuminaire?.();
    lightingModule.popupRequestCalculation?.();
    lightingModule.popupFilesForm?.();
  }

  const needsAutoSwitching = document.querySelector(
    ".automatic-switching, .automatic-switching__btn, .automatic-switching__note"
  );
  if (needsAutoSwitching) {
    const autoModule = await import("./js/automaticSswitching");
    autoModule.popupSelectingLuminaireSwitching?.();
    autoModule.popupCalculationAlgorithmSwitching?.();
  }

  if (document.querySelector(".portfolio-index__tab")) {
    const portfolioModule = await import("./js/portfolio");
    portfolioModule.portfolioTabs?.();
  }

  if (document.getElementById("categorySelect")) {
    const customSelectModule = await import("./js/customSeletArrow");
    customSelectModule.default?.();
  }
}

function updatePlaceholder() {
  const input = document.getElementById("name");
  if (!input) return;
  if (window.innerWidth < 992) {
    input.placeholder = "ФИО полностью";
  } else {
    input.placeholder = "Рекомендуем указывать ФИО полностью";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  markImagesLazy();
  initMenu();
  initBurgerMenu();
  initCalculatorControls();
  initFeatureModules();
  initSwipers();
  updatePlaceholder();
});
