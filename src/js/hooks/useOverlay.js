export function overlay() {
    const overlayEl = document.querySelector('[data-overlay]');
    if (!overlayEl) return;

    const api = {
        open() {
            overlayEl.classList.add('is-active');
            document.documentElement.classList.add('overlay-open');
        },

        close() {
            overlayEl.classList.remove('is-active');
            document.documentElement.classList.remove('overlay-open');
        },

        closeClickInit() {
            overlayEl.addEventListener('click', () => {
                api.close();
            });
        },
        el: overlayEl
    };

    return api;
}