export function initFilterCanvasAccordion() {
  const canvas = document.querySelector('.filter-c');
  if (!canvas) return;

  const parentBtn = canvas.querySelector('[data-parent-toggle]');
  const childSections = canvas.querySelectorAll('.filter-c-section--child'); // <--- поправил селектор

  // --------------------------
  // Универсальный toggle
  // --------------------------
  const toggle = (section, forceState = null) => {
    const content = section.querySelector('.filter-c-content');
    if (!content) return;

    const isOpen = forceState !== null
      ? forceState
      : !section.classList.contains('active');

    // Сбрасываем inline-height перед анимацией
    content.style.transition = 'none';
    content.style.height = section.classList.contains('active') ? content.scrollHeight + 'px' : '0rem';
    // Форсируем ререндер
    content.offsetHeight;
    content.style.transition = 'height 0.3s ease';

    section.classList.toggle('active', isOpen);

    if (isOpen) {
      content.style.height = content.scrollHeight + 'px';
    } else {
      content.style.height = '0rem';
    }

    // После transition ставим auto
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
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // чтобы родитель не срабатывал
      toggle(section);
    });
  });

  // --------------------------
  // Родительский toggle
  // --------------------------
  if (parentBtn) {
    parentBtn.addEventListener('click', () => {
      const allOpen = [...childSections].every(s => s.classList.contains('active'));
      const newState = !allOpen;

      childSections.forEach(section => toggle(section, newState));
      canvas.querySelector('.filter-c-section--parent')
        .classList.toggle('active', newState);
    });
  }
}