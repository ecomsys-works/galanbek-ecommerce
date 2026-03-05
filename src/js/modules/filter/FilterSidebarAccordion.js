export function initFilterSidebarAccordion() {
  const sidebar = document.querySelector('.filter-s');
  if (!sidebar) return;

  const parentBtn = sidebar.querySelector('[data-parent-toggle]');
  const childSections = sidebar.querySelectorAll('.filter-s-section--child');

  // --------------------------
  // Универсальный toggle
  // --------------------------
  const toggle = (section, forceState = null) => {
    const content = section.querySelector('.filter-s-content');
    if (!content) return;

    const isOpen = forceState !== null
      ? forceState
      : !section.classList.contains('active');

    // Сбрасываем inline-height перед анимацией
    content.style.transition = 'none';
    content.style.height = section.classList.contains('active') ? content.scrollHeight + 'px' : '0px';
    // Форсируем ререндер
    content.offsetHeight;
    content.style.transition = 'height 0.3s ease';

    section.classList.toggle('active', isOpen);

    if (isOpen) {
      // открытие
      content.style.height = content.scrollHeight + 'px';
    } else {
      // закрытие
      content.style.height = '0px';
    }

    // После transition ставим auto, чтобы подстраивался под контент
    const onTransitionEnd = () => {
      if (section.classList.contains('active')) {
        content.style.height = 'auto';
      }
      content.removeEventListener('transitionend', onTransitionEnd);
    };
    content.addEventListener('transitionend', onTransitionEnd);
  };

  // --------------------------
  // Дочерние toggle
  // --------------------------
  childSections.forEach(section => {
    const btn = section.querySelector('[data-toggle]');
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // чтобы родитель не срабатывал
      toggle(section);
    });
  });

  // --------------------------
  // Родительский toggle
  // --------------------------
  parentBtn.addEventListener('click', () => {
    const allOpen = [...childSections].every(s => s.classList.contains('active'));
    const newState = !allOpen;

    childSections.forEach(section => toggle(section, newState));
    sidebar.querySelector('.filter-s-section.parent')
      .classList.toggle('active', newState);
  });
}