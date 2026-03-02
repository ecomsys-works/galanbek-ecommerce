// modules/initDesktopMenu.js
export function initDesktopMenu(options) {
    const GAP = options?.gap || 5; // отступ для субменю
    const HOVER_DELAY = options?.delay || 500; // задержка hover-intent

    const parentItems = document.querySelectorAll('.nav__item--has-children'); // пункты с подменю 2-го уровня
    const topLevelItems = document.querySelectorAll('.nav__list > .nav__item'); // все верхние пункты

    let currentOpenSubMenu = null; // текущее открытое подменю
    let currentOpenMainDropdown = null; // текущее открытое верхнее меню
    let currentOpenMainItem = null; // пункт верхнего меню, который открыт

    let subCloseTimeout = null; // таймер закрытия подменю
    let mainCloseTimeout = null; // таймер закрытия верхнего меню

    /* =========================
       HELPERS
    ========================== */

    // сброс таймера
    function clearTimer(timer) {
        if (timer) clearTimeout(timer);
        return null;
    }

    // временно показать подменю, чтобы узнать его ширину
    function getSubMenuWidth(subMenu) {
        subMenu.style.visibility = 'hidden';
        subMenu.style.display = 'block';
        const width = subMenu.getBoundingClientRect().width;
        subMenu.style.display = '';
        subMenu.style.visibility = '';
        return width;
    }

    // позиционирование подменю относительно родителя
    function positionSubMenu(parentItem, subMenu) {
        const link = parentItem.querySelector('a');
        const rect = link.getBoundingClientRect();
        const subWidth = getSubMenuWidth(subMenu);

        let left = rect.right + GAP + 10; // небольшой дополнительный GAP

        if (left + subWidth > window.innerWidth) {
            left = rect.left - subWidth - GAP; // если справа не помещается — сдвигаем влево
        }

        if (left < GAP) left = GAP; // не вылезаем за левый край

        let top = rect.top - 10; // смещение вверх
        if (top < GAP) top = GAP;

        const maxHeight = window.innerHeight - top - GAP;

        subMenu.style.left = `${left}px`;
        subMenu.style.top = `${top}px`;
        subMenu.style.maxHeight = `${maxHeight}px`; // чтобы не вылезало за экран
    }

    /* =========================
       SUB MENU (2 уровень)
    ========================== */

    // открыть подменю 2-го уровня
    function openSubMenu(parentItem, subMenu) {
        subCloseTimeout = clearTimer(subCloseTimeout);

        if (currentOpenSubMenu && currentOpenSubMenu !== subMenu) {
            currentOpenSubMenu.style.display = 'none'; // закрываем предыдущий
        }

        currentOpenSubMenu = subMenu;
        positionSubMenu(parentItem, subMenu);
        subMenu.style.display = 'block';
    }

    // мгновенное закрытие подменю
    function closeSubMenuImmediate() {
        subCloseTimeout = clearTimer(subCloseTimeout);

        if (currentOpenSubMenu) {
            currentOpenSubMenu.style.display = 'none';
            currentOpenSubMenu = null;
        }
    }

    // закрытие подменю с задержкой hover-intent
    function scheduleSubClose(subMenu) {
        subCloseTimeout = clearTimer(subCloseTimeout);

        subCloseTimeout = setTimeout(() => {
            if (
                !subMenu.parentElement.matches(':hover') &&
                !subMenu.matches(':hover')
            ) {
                closeSubMenuImmediate();
            }
        }, HOVER_DELAY);
    }

    // обработчики для всех пунктов с подменю второго уровня
    parentItems.forEach(parentItem => {
        const subMenu = parentItem.querySelector('.nav__sub-dropdown');
        if (!subMenu) return;

        parentItem.addEventListener('mouseenter', () => {
            openSubMenu(parentItem, subMenu);
        });

        parentItem.addEventListener('mouseleave', () => {
            scheduleSubClose(subMenu);
        });

        subMenu.addEventListener('mouseenter', () => {
            subCloseTimeout = clearTimer(subCloseTimeout); // отменяем таймер, если мышь в подменю
        });

        subMenu.addEventListener('mouseleave', () => {
            scheduleSubClose(subMenu);
        });
    });

    /* =========================
       MAIN DROPDOWN (верхний уровень)
    ========================== */

    // открыть верхнее меню
    function openMainDropdown(item) {
        mainCloseTimeout = clearTimer(mainCloseTimeout);

        const dropdown = item.querySelector('.nav__dropdown');
        if (!dropdown) return;

        // если открыт другой пункт — закрываем его и его подменю
        if (currentOpenMainDropdown && currentOpenMainDropdown !== dropdown) {
            currentOpenMainDropdown.style.display = 'none';
            currentOpenMainItem?.classList.remove('is-open'); // сброс каретки
            closeSubMenuImmediate();
        }

        currentOpenMainDropdown = dropdown;
        currentOpenMainItem = item;

        item.classList.add('is-open'); // крутим каретку
        dropdown.style.display = 'block';
    }

    // мгновенное закрытие верхнего меню
    function closeMainDropdownImmediate() {
        mainCloseTimeout = clearTimer(mainCloseTimeout);

        if (currentOpenMainDropdown) {
            currentOpenMainDropdown.style.display = 'none';
        }

        if (currentOpenMainItem) {
            currentOpenMainItem.classList.remove('is-open'); // сброс каретки
        }

        currentOpenMainDropdown = null;
        currentOpenMainItem = null;

        closeSubMenuImmediate();
    }

    // закрытие верхнего меню с задержкой hover-intent
    function scheduleMainClose(item, dropdown) {
        mainCloseTimeout = clearTimer(mainCloseTimeout);

        mainCloseTimeout = setTimeout(() => {
            if (
                !item.matches(':hover') &&
                !dropdown.matches(':hover')
            ) {
                closeMainDropdownImmediate();
            }
        }, HOVER_DELAY);
    }

    // обработчики для всех верхних пунктов с dropdown
    topLevelItems.forEach(item => {
        const dropdown = item.querySelector('.nav__dropdown');
        if (!dropdown) return;

        item.addEventListener('mouseenter', () => {
            openMainDropdown(item);
        });

        item.addEventListener('mouseleave', (e) => {
            const to = e.relatedTarget;

            if (!to) {
                scheduleMainClose(item, dropdown);
                return;
            }

            const nextItem = to.closest('.nav__list > .nav__item');

            // переход на другой верхний dropdown → мгновенно закрыть текущий
            if (
                nextItem &&
                nextItem !== item &&
                nextItem.classList.contains('nav__item--has-dropdown')
            ) {
                closeMainDropdownImmediate();
                return;
            }

            // переход внутрь своего dropdown → игнор
            if (dropdown.contains(to)) return;

            scheduleMainClose(item, dropdown);
        });

        dropdown.addEventListener('mouseenter', () => {
            mainCloseTimeout = clearTimer(mainCloseTimeout); // мышь внутри dropdown — отменяем таймер
        });

        dropdown.addEventListener('mouseleave', () => {
            scheduleMainClose(item, dropdown); // мышь ушла из dropdown — запускаем таймер
        });
    });

    return true;
}