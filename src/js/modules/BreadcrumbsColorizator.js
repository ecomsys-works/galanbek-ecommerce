export function breadcrumbsColorizator(options = {}) {
  const color = options.col || '#fff';
  const sb = options.startBreakpoint ? Number(options.startBreakpoint) : 576;
  const eb = options.endBreakpoint ? Number(options.endBreakpoint) : 992;

  // Находим контейнер с айдишником страницы
  const page = document.getElementById('catalog-products-page');
  if (!page) return; // если такой страницы нет — выходим

  // Находим элемент хлебных крошек
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (!breadcrumbs) return; // если нет хлебных крошек — выходим

  // Функция проверки ширины окна и установки цвета
  const updateBackground = () => {
    if (window.innerWidth > sb && window.innerWidth < eb) {
      breadcrumbs.style.backgroundColor = color;
    } else {
      breadcrumbs.style.backgroundColor = ''; // сброс если вне диапазона
    }
  };

  // Запускаем сразу
  updateBackground();

  // Ставим обработчик на ресайз
  window.addEventListener('resize', updateBackground);
}