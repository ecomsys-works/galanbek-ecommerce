export function useSidebarScrollSync() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Блокируем body при наведении
    sidebar.addEventListener('mouseenter', () => {
        document.body.style.overflow = 'hidden';
    });

    sidebar.addEventListener('mouseleave', () => {
        document.body.style.overflow = '';
    });

    // Главная магия — слушаем wheel глобально
    window.addEventListener('wheel', (e) => {

        const bodyScrollTop = window.scrollY || document.documentElement.scrollTop;

        // Если страница уже вверху и крутим вверх
        if (bodyScrollTop <= 0 && e.deltaY < 0) {

            // Если сайдбар еще может скроллиться вверх
            if (sidebar.scrollTop > 0) {
                sidebar.scrollTop += e.deltaY; // deltaY отрицательный → скролл вверх
                e.preventDefault(); // чтобы страница не дергалась
            }
        }

    }, { passive: false });
}