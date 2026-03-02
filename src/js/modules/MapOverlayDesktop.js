export function initMapOverlayDesktop() {
    const mapBox = document.querySelector(".map__box");
    let timer = null;

    mapBox.addEventListener("mouseenter", () => {
        // Проверяем, ширина экрана >= 768px
        if (window.innerWidth >= 768) {
            timer = setTimeout(() => {
                mapBox.classList.add("is-active");
            }, 1000);
        }
    });

    mapBox.addEventListener("mouseleave", () => {
        if (window.innerWidth >= 768) {
            clearTimeout(timer);
            mapBox.classList.remove("is-active");
        }
    });
}
