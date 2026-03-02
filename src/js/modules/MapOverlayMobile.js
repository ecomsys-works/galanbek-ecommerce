export function initMapOverlayMobile() {
    const mapBox = document.querySelector(".map__box");
    if (!mapBox) return;

    let timer = null; 

    // Добавляем активный класс по тапу на карту
    mapBox.addEventListener("click", (e) => {
        if (window.innerWidth < 768) {
            e.stopPropagation(); // чтобы клик на карте не срабатывал на документ
            mapBox.classList.add("is-active");

            // Сбрасываем старый таймер, если был
            if (timer) clearTimeout(timer);

            // Через 10 секунд автоматически снимаем класс
            timer = setTimeout(() => {
                mapBox.classList.remove("is-active");
                timer = null;
            }, 5000);
        }
    });

    // Снимаем активный класс при клике вне карты
    document.addEventListener("click", () => {
        if (window.innerWidth < 768) {
            mapBox.classList.remove("is-active");

            // Очищаем таймер, если есть
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
    });
}