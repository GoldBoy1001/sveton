export default function customSeletArrow() {
  const customSelect = document.getElementById("categorySelect");
  const selectField = customSelect.querySelector(".custom-select__field");

  let clickCount = 0;
  if (selectField) {
    selectField.addEventListener("mouseup", () => {
      clickCount++;

      if (clickCount % 2 === 1) {
        // Нечётный — открытие селекта
        customSelect.classList.add("custom-select--open");
      } else {
        // Чётный — закрытие селекта
        customSelect.classList.remove("custom-select--open");
      }
    });
  }
  // Клик вне селекта — сбросим состояние
  if (customSelect) {
    document.addEventListener("mousedown", e => {
      if (!customSelect.contains(e.target)) {
        clickCount = 0;
        customSelect.classList.remove("custom-select--open");
      }
    });
  }
}
