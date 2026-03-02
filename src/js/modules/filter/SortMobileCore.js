export function initSortMobileCanvas({ selectId, canvasId = 'filterCanvas' }) {

  const select = document.getElementById(selectId);
  if (!select) return;

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const sortId = 'sortCatalogCanvas';

  const renderSection = () => {

    const options = Array.from(select.options).map(opt => ({
      value: opt.value,
      text: opt.textContent,
      selected: opt.selected
    }));

    const selectedOption = select.selectedOptions[0];

    const container = canvas.querySelector(`[data-sort-id="${sortId}"]`);
    if (!container) return;

    container.innerHTML = `
      <span class="filter-c-header__title">Сортировка</span>
      <button class="filter-c-header filter-c-header--sort ${selectedOption ? 'is-selected' : ''}" data-toggle>
        <span class="filter-c-title" data-sort-title>${selectedOption ? selectedOption.textContent : 'Сортировка'}</span>
        <span class="filter-c-caret">▼</span>
      </button>
      <div class="filter-c-content filter-c-content--sort">
        <ul class="filter-c-inner filter-c-list">
          ${options.map(opt => `
            <li 
              data-sort-option 
              data-value="${opt.value}" 
              class="filter-c-item ${opt.selected ? 'active' : ''}"
            >
              ${opt.text}
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    const headerButton = container.querySelector('[data-toggle]');
    const title = container.querySelector('[data-sort-title]');
    const items = container.querySelectorAll('[data-sort-option]');

    // --------------------------------------------------
    // Клик по пункту с подсветкой
    // --------------------------------------------------
    items.forEach(item => {
      item.addEventListener('click', () => {

        const value = item.dataset.value;

        // обновляем select
        select.value = value;
        select.querySelectorAll('option').forEach(opt => opt.removeAttribute('selected'));
        const optToSelect = select.querySelector(`option[value="${value}"]`);
        if (optToSelect) optToSelect.setAttribute('selected', 'selected');

        // триггер change
        select.dispatchEvent(new Event('change'));

        // обновляем активный класс
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // закрываем аккордеон, если открыт
        if (headerButton.classList.contains('active')) {
          headerButton.click();
        }
      });
    });

    // --------------------------------------------------
    // Синхронизация при change
    // --------------------------------------------------
    select.addEventListener('change', () => {
      const selected = select.selectedOptions[0];

      // меняем заголовок
      title.textContent = selected.textContent;

      // подсветка заголовка
      headerButton.classList.add('is-selected');

      // подсветка активного пункта
      items.forEach(item => {
        item.classList.toggle('active', item.dataset.value === select.value);
      });
    });
  };

  renderSection();
}