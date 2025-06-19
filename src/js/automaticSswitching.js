export function popupSelectingLuminaireSwitching() {
  const popup = document.querySelector(
    ".automatic-switching-popup-selecting-luminaire"
  );
  const openBtn = document.querySelector(".automatic-switching__btn"); // <– заменили кнопку
  const closeBtn = document.querySelector(
    ".lighting-calculator-popup-selecting-luminaire__btn"
  );

  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      popup.classList.add("active-selecting-luminaire");
      document.body.classList.add("popup-open");
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active-selecting-luminaire");
      document.body.classList.remove("popup-open");
    });
  }
}

export function popupCalculationAlgorithmSwitching() {
  const popup = document.querySelector(
    ".automatic-switching-popup-calculation-algorithm"
  );
  const openBtn = document.querySelector(".automatic-switching__note"); // <– заменили кнопку
  const closeBtn = document.querySelector(
    ".lighting-calculator-popup-calculation-algorithm__btn"
  );

  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      popup.classList.add("active-calculation-algorithm");
      document.body.classList.add("popup-open");
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active-calculation-algorithm");
      document.body.classList.remove("popup-open");
    });
  }
}
