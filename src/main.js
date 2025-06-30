import "./scss/style.scss";
import { Swiper } from "./js/swiper-bundle.min";
import {
  lightingParameters,
  disabledBtn,
  popupCalculationAlgorithm,
  popupSelectingLuminaire,
  popupRequestCalculation,
  popupFilesForm,
} from "./js/lightingParameters";
import {
  popupSelectingLuminaireSwitching,
  popupCalculationAlgorithmSwitching,
} from "./js/automaticSswitching";
import { portfolioTabs } from "./js/portfolio";
const thumbsSwiper = new Swiper(".left-catalog-element__thumbs", {
  direction: window.innerWidth >= 992 ? "vertical" : "horizontal",
  slidesPerView: "auto",
  spaceBetween: 10,
  watchSlidesProgress: true,
  watchOverflow: true,
});

const mainSwiper = new Swiper(".left-catalog-element__main", {
  slidesPerView: 1,
  spaceBetween: 10,
  watchOverflow: true,
  thumbs: {
    swiper: thumbsSwiper,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

new Swiper(".my-slide", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    // когда ширина экрана меньше 768 пикселей
    769: {
      slidesPerView: 3.2,
      spaceBetween: 20,
    },
    // когда ширина экрана меньше 1024 пикселей
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    // и так далее
  },
  navigation: {
    nextEl: ".products-slide__prev",
    prevEl: ".products-slide__next",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   dynamicBullets: true,
  // },
});

const swperPortfolio = new Swiper(".portfolio-slides", {
  slidesPerView: 1,
  // spaceBetween: 30,
  // loop: true,
  // breakpoints: {
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 20,
  //   },
  //   // когда ширина экрана меньше 768 пикселей
  //   560: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   // когда ширина экрана меньше 1024 пикселей
  //   992: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  //   // и так далее
  // },
  navigation: {
    nextEl: ".portfolio-slide__prev",
    prevEl: ".portfolio-slide__next",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   dynamicBullets: true,
  // },
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
const projectNavSwiper = new Swiper(".projects-portfolio-mobile", {
  slidesPerView: 3.2,
  slidesPerGroup: 1,
  spaceBetween: 10,
  breakpoints: {
    320: {
      slidesPerView: 1.6,
      spaceBetween: 20,
    },
    // когда ширина экрана меньше 768 пикселей
    510: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    // когда ширина экрана меньше 1024 пикселей
    900: {
      slidesPerView: 3.4,
      spaceBetween: 30,
    },
    // и так далее
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  on: {
    click: function (swiper) {
      const clickedIndex = swiper.clickedIndex;
      if (typeof clickedIndex !== "undefined") {
        swperPortfolio.slideTo(clickedIndex);

        updateActiveNavSlide(clickedIndex);
      }
    },
  },
});

// Синхронизация при смене основного слайда
swperPortfolio.on("slideChange", () => {
  projectNavSwiper.slideTo(swperPortfolio.activeIndex);
});

new Swiper(".portfolio-detail-slides", {
  slidesPerView: 1,
  // spaceBetween: 30,
  loop: true,
  // breakpoints: {
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 20,
  //   },
  //   // когда ширина экрана меньше 768 пикселей
  //   560: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   // когда ширина экрана меньше 1024 пикселей
  //   992: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  //   // и так далее
  // },
  navigation: {
    nextEl: ".portfolio-detail-slide__prev",
    prevEl: ".portfolio-detail-slide__next",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   dynamicBullets: true,
  // },
});
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-top__item-link");

  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu__list a");

  if (menuItems) {
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Удалить класс 'active' у всех пунктов меню
        menuItems.forEach((i) => i.classList.remove("active-menu-item"));
        // Добавить класс 'active' к текущему пункту меню
        item.classList.add("active-menu-item");
      });
    });
  }
  // ============================================================
  document
    .querySelectorAll(".lighting-calculator__control")
    .forEach((control) => {
      const input = control.querySelector(".dimension-input");
      const increment = control.querySelector(".btn-increment");
      const decrement = control.querySelector(".btn-decrement");

      // Безопасная проверка на наличие всех элементов
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
  lightingParameters();
  disabledBtn();
  popupCalculationAlgorithm();
  popupSelectingLuminaire();
  popupRequestCalculation();
  popupFilesForm();
  popupSelectingLuminaireSwitching();
  popupCalculationAlgorithmSwitching();
  portfolioTabs();

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

  // Клик по карточке — переключает слайд
  document
    .querySelectorAll(".projects-portfolio__card")
    .forEach((card, index) => {
      card.addEventListener("click", () => {
        swperPortfolio.slideTo(index);
      });
    });
  // Обновление активной кнопки
  function updateActiveNavSlide(index) {
    const cards = document.querySelectorAll(".projects-portfolio-mobile-slide");

    cards.forEach((card, i) => {
      card.classList.toggle(
        "projects-portfolio-mobile-slide-active",
        i === index
      );
    });

    // Прокрутка кнопок при смене основного слайда
    projectNavSwiper.slideTo(index);
  }

  // Слушатель на основной слайдер
  swperPortfolio.on("slideChange", function () {
    const activeIndex = swperPortfolio.activeIndex;
    updateActiveNavSlide(activeIndex);
  });
  function updatePlaceholder() {
    const input = document.getElementById("name");
    if (window.innerWidth < 992) {
      input.placeholder = "ФИО полностью";
    } else {
      input.placeholder = "Рекомендуем указывать ФИО полностью";
    }
  }
  updatePlaceholder();
});
