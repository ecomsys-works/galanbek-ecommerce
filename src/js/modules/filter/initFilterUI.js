export function initFilterUI({ formId }) {
  const form = document.getElementById(formId);
  if (!form) return;

  // -------------------------
  // ГРУППИРУЕМ INPUT ПО data-group
  // -------------------------
  const inputs = form.querySelectorAll('input[type="checkbox"][data-group]');
  const groups = {};

  inputs.forEach(input => {
    const groupName = input.dataset.group || 'default';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(input);
  });

  // -------------------------
  // ФУНКЦИЯ ГЕНЕРАЦИИ UI ДЛЯ КОНТЕЙНЕРА
  // -------------------------
  const renderGroupsToContainer = (containerSelector, prefix) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = ''; // очищаем

    Object.entries(groups).forEach(([groupName, groupInputs]) => {
      // Секция группы
      const section = document.createElement('div');
      section.className = `filter-${prefix}-section filter-${prefix}-section--child`;

      // Шапка с кнопкой
      const header = document.createElement('button');
      header.className = `filter-${prefix}-header`;
      header.setAttribute('data-toggle', '');
      header.innerHTML = `
        <span class="filter-${prefix}-label">${groupName}</span>
        <span class="filter-${prefix}-caret">▼</span>
      `;
      section.appendChild(header);

      // Контент группы
      const content = document.createElement('div');
      content.className = `filter-${prefix}-content`;
      const inner = document.createElement('div');
      inner.className =`filter-${prefix}-inner`;

      // Генерация чекбоксов
      inner.innerHTML = groupInputs.map(input => {
        return `
          <div class="filter-check">
            <label class="filter-check__label">
              <input 
                type="checkbox"
                class="filter-check__input"
                data-ui-proxy
                data-name="${input.name}"
                data-value="${input.value}"
                ${input.checked ? 'checked' : ''}
              />
              <span class="filter-check__custom">
                <svg class="icon--checkmark-small">
                  <use href="./icons/symbol/sprite.svg#checkmark-small"></use>
                </svg>
              </span>
              <span class="filter-check__text">${input.value}</span>
            </label>
          </div>
        `;
      }).join('');

      content.appendChild(inner);
      section.appendChild(content);
      container.appendChild(section);
    });
  };

  // -------------------------
  // РЕНДЕР В ОБА КОНТЕЙНЕРА
  // -------------------------
  renderGroupsToContainer('.filter-s-children', 's');
  renderGroupsToContainer('.filter-c-children', 'c');

  // -------------------------
  // ИНИЦИАЛИЗАЦИЯ ПРОКСИ CHECKBOX
  // -------------------------
  initUIProxySync(form);
}

// -------------------------
// СИНХРОНИЗАЦИЯ ПРОКСИ И РЕАЛЬНЫХ INPUT
// -------------------------
function initUIProxySync(form) {
  document.addEventListener('change', (e) => {
    if (!e.target.matches('[data-ui-proxy]')) return;

    const name = e.target.dataset.name;
    const value = e.target.dataset.value;
    const checked = e.target.checked;

    const realInput = form.querySelector(`input[name="${name}"][value="${value}"]`);
    if (realInput) {
      updateRealInputChecked(realInput, checked);
      realInput.dispatchEvent(new Event('change', { bubbles: true }));
      syncUIFromForm(form); // синхронизация всех прокси
    }
  });
}

function updateRealInputChecked(realInput, checked) {
  realInput.checked = checked;
  if (checked) {
    realInput.setAttribute('checked', '');
  } else {
    realInput.removeAttribute('checked');
  }
}

// -------------------------
// СИНХРОНИЗАЦИЯ UI ПРОКСИ С РЕАЛЬНЫМИ INPUT
// -------------------------
export function syncUIFromForm(form) {
  const allUI = document.querySelectorAll('[data-ui-proxy]');
  allUI.forEach(uiInput => {
    const name = uiInput.dataset.name;
    const value = uiInput.dataset.value;

    const realInput = [...form.querySelectorAll(`input[name="${name}"]`)]
      .find(input => input.value === value);

    if (realInput) {
      uiInput.checked = realInput.checked;
    }
  });
}