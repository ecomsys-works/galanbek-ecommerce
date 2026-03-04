
export function handleCartProduct(options = {}) {
    const { id = 'productForm', log = false, cartBtnId = "cart-btn" } = options;

    const form = document.getElementById(id);
    if (!form) {
        console.warn('Форма не найдена:', id);
        return;
    }

    // Находим кнопку корзины в шапке
    const cartBtn = document.getElementById(cartBtnId);

    // Создаём/находим счётчик
    let cartCounter = cartBtn.querySelector('.cart-counter');
    if (!cartCounter) {
        cartCounter = document.createElement('span');
        cartCounter.className = 'cart-counter';
        cartBtn.appendChild(cartCounter);
    }

    // Функция обновления счётчика
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('retailCart')) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalQuantity;
        cartCounter.style.display = totalQuantity > 0 ? 'flex' : 'none';
    }

    // Инициализируем счётчик при загрузке
    updateCartCounter();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.quantity = Number(data.quantity);

        // Берём ID и название прямо с формы
        data.id = form.dataset.productId || 'unknown-id';
        data.title = form.dataset.productTitle || 'Без названия';

        // Цена
        const priceEl = form.querySelector('.product-info__price-new');
        data.price = priceEl ? Number(priceEl.textContent.replace(/\D/g, '')) : 0;

        // Получаем корзину
        const cart = JSON.parse(localStorage.getItem('retailCart')) || [];

        // Проверяем, есть ли такой товар с теми же опциями
        const existingIndex = cart.findIndex(item =>
            item.id === data.id &&
            item.color === data.color &&
            item.memory === data.memory &&
            item.sim === data.sim
        );

        if (existingIndex > -1) {
            cart[existingIndex].quantity += data.quantity;
        } else {
            cart.push(data);
        }

        // Сохраняем корзину
        localStorage.setItem('retailCart', JSON.stringify(cart));

        if (log) {
            console.log('Товар добавлен в корзину:', data);
            console.log('Текущая корзина:', cart);
        }

        // Обновляем счётчик
        updateCartCounter();
    });
}

