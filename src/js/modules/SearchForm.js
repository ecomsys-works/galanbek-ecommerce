export function initSearchForm() {
    const searchBtn = document.getElementById('header-search-btn');
    const searchForm = document.getElementById('search-form');

    if (!searchForm || !searchBtn) return;

    const input = searchForm.querySelector('.search-block__input');
    const clearBtn = searchForm.querySelector('.search-block__clear');
    const tags = searchForm.querySelectorAll('.search-block__tag');
    const form = searchForm.querySelector('form'); // сама форма
    const inputWrapper = searchForm.querySelector('.search-block__input-wrapper');
    
    /* =========================
       Toggle формы поиска
    ========================== */
    function toggleSearchForm() {
        if (searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
           
        } else {
            searchForm.classList.add('active');           
            input.focus();
        }
    }

    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSearchForm();
    });

    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target) && e.target !== searchBtn) {
            searchForm.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchForm.classList.remove('active');
        }
    });

    /* =========================
       Работа с тегами
    ========================== */
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            if (input) input.value = tag.textContent.trim();

            // Активный класс на тег
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });

    /* =========================
       Кнопка очистки
    ========================== */
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (input) input.value = '';
            input.focus();

            // Убираем активный класс со всех тегов
            tags.forEach(t => t.classList.remove('active'));
        });
    }

    /* =========================
       Сабмит формы
    ========================== */
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Search submitted:', input.value);
            // AJAX можно сюда
        });
    }

    /* =========================
       Искусственный фокус
    ========================== */
    if (inputWrapper && input) {
        input.addEventListener('focus', () => inputWrapper.classList.add('focus'));
        input.addEventListener('blur', () => inputWrapper.classList.remove('focus'));
    }

    return true;
}