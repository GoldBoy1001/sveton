import "./scss/style.scss";
import { Swiper } from "./js/swiper-bundle.min";

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
});
