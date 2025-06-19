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

new Swiper(".my-slide", {
  slidesPerView: 4,
  spaceBetween: 30,
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
    nextEl: ".products-slide__prev",
    prevEl: ".products-slide__next",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   dynamicBullets: true,
  // },
});

new Swiper(".portfolio-slides", {
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
    nextEl: ".portfolio-slide__prev",
    prevEl: ".portfolio-slide__next",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   dynamicBullets: true,
  // },
});
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-top__item-link");

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
});
