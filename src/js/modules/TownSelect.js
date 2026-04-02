export function initTownSelect({ selectId }) {
  const select = document.getElementById(selectId);
  if (!select) return console.warn(`Select с id="${selectId}" не найден`);

  const container = document.querySelector(`[data-town-desktop][data-town-id="${selectId}"]`);
  if (!container) return console.warn(`Контейнер кастомного UI для select="${selectId}" не найден`);

  const options = Array.from(select.options).map(opt => ({
    value: opt.value,
    text: opt.textContent,
    selected: opt.selected
  }));

  let isClosed = false;       // <-- флаг "закрыто"
  let lastMouse = { x: 0, y: 0 };

  const renderUI = () => {
    container.innerHTML = `
      <div class="town-desktop header__icon-btn header__location">
        <svg class="icon icon--header-marker">
          <use href="./icons/symbol/sprite.svg#marker"></use>
        </svg>
        <span data-town-label>${select.selectedOptions[0].textContent}</span>
      </div>
      <ul class="town-desktop__dropdown">
        <div class="town-desktop__dropdown__close">
          <svg>
            <use href="./icons/symbol/sprite.svg#close"></use>
          </svg>
        </div>
        ${options.map(opt => `<li data-town-option data-value="${opt.value}" ${opt.selected ? 'class="active"' : ''}>${opt.text}</li>`).join('')}
      </ul>
    `;

    const label = container.querySelector('[data-town-label]');
    const items = container.querySelectorAll('[data-town-option]');
    const dropdown = container.querySelector('.town-desktop__dropdown');
    const closeBtn = container.querySelector('.town-desktop__dropdown__close');

    // ---------- крестик закрытия ----------
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.opacity = '0';
      dropdown.style.transform = 'translateY(0.625rem)';
      dropdown.style.pointerEvents = 'none';
      isClosed = true;
    });

    // ---------- выбор пункта ----------
    items.forEach(item => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;
        select.querySelectorAll('option').forEach(opt => opt.removeAttribute('selected'));
        const optToSelect = select.querySelector(`option[value="${value}"]`);
        if (optToSelect) optToSelect.setAttribute('selected', 'selected');
        select.value = value;

        items.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        label.textContent = select.selectedOptions[0].textContent;
        select.dispatchEvent(new Event('change'));

        // закрываем дроп через inline-стили
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(0.625rem)';
        dropdown.style.pointerEvents = 'none';
        isClosed = true;
      });
    });

    // ---------- наблюдение за мышкой ----------
    document.addEventListener('mousemove', (e) => {
      if (!isClosed) return;

      const dx = Math.abs(e.clientX - lastMouse.x);
      const dy = Math.abs(e.clientY - lastMouse.y);
      if (dx > 10 || dy > 10) {
        // Убираем inline-стили, чтобы hover снова сработал
        dropdown.style.removeProperty('opacity');
        dropdown.style.removeProperty('transform');
        dropdown.style.removeProperty('pointer-events');
        isClosed = false;
      }

      lastMouse = { x: e.clientX, y: e.clientY };
    });

    // ---------- инициализация активного пункта ----------
    select.dispatchEvent(new Event('change'));
  };

  renderUI();
  return select;
}