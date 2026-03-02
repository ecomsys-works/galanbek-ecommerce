import { overlay } from "../hooks/useOverlay";

export function initFilterCanvas() {

    const filterBtn = document.getElementById('filterBtn');
    const canvas = document.getElementById('filterCanvas');
    const closeBtn = canvas?.querySelector('#filter-c-close');

    const Overlay = overlay();

    if (!filterBtn || !canvas) return;

    // const openCanvas = () => {
    //     canvas.classList.add('active');
    //     Overlay.open();
    // };

    const toggleCanvas = () => {
        canvas.classList.toggle('active');
        if (canvas.classList.contains('active')) {
            Overlay.open();
        } else {
            Overlay.close();
        }

    };


    const closeCanvas = () => {
        canvas.classList.remove('active');
        Overlay.close();
    };

    filterBtn.addEventListener('click', toggleCanvas);

    closeBtn?.addEventListener('click', closeCanvas);

    Overlay.el.addEventListener("click", closeCanvas);
}