export function initSortDesktopCore({ selectId, dropdownClass = 'default', sortTypesIsReplaceLg = true }) {

  // ------------------------------
  // Находим нативный select
  // ------------------------------
  const select = document.getElementById(selectId);
  if (!select) {
    console.warn(`Select с id="${selectId}" не найден`);
    return;
  }

  const sortId = select.dataset.sortId;
  if (!sortId) {
    console.warn(`Select с id="${selectId}" не имеет data-sort-id`);
    return;
  }

  // ------------------------------
  // Контейнер кастомного UI
  // ------------------------------
  const container = document.querySelector(`[data-sort-desktop][data-sort-id="${sortId}"]`);
  if (!container) {
    console.warn(`Контейнер кастомного UI для sort-id="${sortId}" не найден`);
    return;
  }

  // ------------------------------
  // Читаем опции из select
  // ------------------------------
  const options = Array.from(select.options).map(opt => ({
    value: opt.value,
    text: opt.textContent,
    selected: opt.selected
  }));

  // ------------------------------
  // Содержимое для десктопа
  // ------------------------------
  const desktopCurrentContent = `
    <span data-sort-label>${select.selectedOptions[0].textContent}</span>
    <span class="sort-desktop__caret">▼</span>
  `;

  // ------------------------------
  // Содержимое для мобильной кнопки
  // ------------------------------
  const mobileCurrentContent = `
    <span class="filter-sorting">
      <svg class="icon icon--filter-sorting">
        <use href="./icons/symbol/sprite.svg#sorting-left"></use>
      </svg>
      <span>Сортировка</span>
    </span>
  `;

  // ------------------------------
  // Функция генерации кастомного UI
  // ------------------------------
  const renderUI = () => {
    let currentContent;

    // --------------------------
    // Выбор контента по типу и ширине
    // --------------------------
    if (sortTypesIsReplaceLg && selectId === 'sortTypes' && window.innerWidth < 992) {
      currentContent = mobileCurrentContent;  // мобильная кнопка
    } else {
      currentContent = desktopCurrentContent; // десктопная версия
    }

    // --------------------------
    // Генерация разметки
    // --------------------------
    container.innerHTML = `
      <div class="sort-desktop__current">
        ${currentContent}
      </div>
      <ul class="sort-desktop__dropdown sort-desktop__dropdown--${dropdownClass}">
        ${options.map(opt => `
          <li data-sort-option data-value="${opt.value}" ${opt.selected ? 'class="active"' : ''}>
            ${opt.text}
          </li>`).join('')}
      </ul>
    `;

    // --------------------------
    // Находим элементы для работы
    // --------------------------
    const label = container.querySelector('[data-sort-label]');
    const dropdownItems = container.querySelectorAll('[data-sort-option]');

    // --------------------------
    // Клик по кастомному пункту с подсветкой active
    // --------------------------
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;

        // снимаем selected у всех option нативного select
        select.querySelectorAll('option').forEach(opt => opt.removeAttribute('selected'));

        // ставим selected нужному option нативного select
        const optToSelect = select.querySelector(`option[value="${value}"]`);
        if (optToSelect) {
          optToSelect.setAttribute('selected', 'selected');
          select.value = value; // синхронизируем value
        }

        // --------------------------
        // Подсветка в UI: снимаем active у всех, добавляем выбранному
        // --------------------------
        dropdownItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        // триггерим change
        select.dispatchEvent(new Event('change'));
      });
    });

    // --------------------------
    // Обновление активного класса при change select
    // --------------------------
    select.addEventListener('change', () => {
      const selectedOption = select.selectedOptions[0];

      // обновляем label кастомного UI
      if (label) label.textContent = selectedOption.textContent;

      // подсветка active в UI
      dropdownItems.forEach(item => {
        item.classList.toggle('active', item.dataset.value === select.value);
      });

      console.log('Селект обновился: ', select.value, selectedOption);
    });

    // инициализация при рендере
    select.dispatchEvent(new Event('change'));
  };

  // ------------------------------
  // Первый рендер UI
  // ------------------------------
  renderUI();

  // ------------------------------
  // Слушаем ресайз окна и перерендериваем UI при необходимости
  // ------------------------------
  window.addEventListener('resize', () => {
    renderUI();
  });

}