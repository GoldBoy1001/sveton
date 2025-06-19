export function lightingParameters() {
  const toggleGroups = document.querySelectorAll(
    ".lighting-calculator__surface-options, .lighting-calculator__reserve-options"
  );

  if (toggleGroups.length > 0) {
    toggleGroups.forEach((group) => {
      group.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "button") {
          group
            .querySelectorAll("button")
            .forEach((btn) => btn.classList.remove("active"));
          e.target.classList.add("active");
        }
      });
    });
  }
}

export function disabledBtn() {
  const submitBtn = document.querySelector(".lighting-calculator__submit");

  const ceiling = document.querySelectorAll('input[name="ceiling"]');
  const walls = document.querySelectorAll('input[name="walls"]');
  const floor = document.querySelectorAll('input[name="floor"]');

  if (!submitBtn || !ceiling.length || !walls.length || !floor.length) return;

  function checkSelections() {
    const ceilingChecked = Array.from(ceiling).some((input) => input.checked);
    const wallsChecked = Array.from(walls).some((input) => input.checked);
    const floorChecked = Array.from(floor).some((input) => input.checked);

    submitBtn.disabled = !(ceilingChecked && wallsChecked && floorChecked);
  }

  [...ceiling, ...walls, ...floor].forEach((input) => {
    input.addEventListener("change", checkSelections);
  });

  checkSelections();
}

export function popupCalculationAlgorithm() {
  const popup = document.querySelector(
    ".lighting-calculator-popup-calculation-algorithm"
  );
  const openBtn = document.querySelector(".lighting-calculator__note"); // <– заменили кнопку
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

export function popupRequestCalculation() {
  const popup = document.querySelector(
    ".lighting-calculator-popup-request-calculation"
  );
  const openBtn = document.querySelector(".lighting-calculator__submit"); // <– заменили кнопку
  const closeBtn = document.querySelector(
    ".lighting-calculator-popup-request-calculation__btn"
  );

  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      popup.classList.add("active-request-calculation");
      document.body.classList.add("popup-open");
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active-request-calculation");
      document.body.classList.remove("popup-open");
    });
  }
}
export function popupSelectingLuminaire() {
  const popup = document.querySelector(
    ".lighting-calculator-popup-selecting-luminaire"
  );
  const openBtn = document.querySelector(".lighting-calculator__btn"); // <– заменили кнопку
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

export function popupFilesForm() {
  const fileInput = document.getElementById("fileInput");
  const realFileName = document.getElementById("realFileName");
  const fakeFileName = document.getElementById("fakeFileName");
  const removeFakeFileBtn = document.getElementById("removeFakeFile");

  const radioButtons = document.querySelectorAll('input[name="file_type"]');
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        realFileName.textContent = file.name;
        fakeFileName.textContent = file.name;
      }
    });
  }
  if (removeFakeFileBtn) {
    removeFakeFileBtn.addEventListener("click", () => {
      fakeFileName.textContent = "Файл удалён";
      realFileName.textContent = "имя файла";
    });
  }
}
