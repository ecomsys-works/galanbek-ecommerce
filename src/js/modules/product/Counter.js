export function ProductCounter(options) {

    const form = document.getElementById(options?.id) || document.getElementById('productForm');

    form.addEventListener('click', (e) => {
        const input = form.querySelector('.quantity__input');

        if (e.target.dataset.action === 'plus') {
            input.value = +input.value + 1;
        }

        if (e.target.dataset.action === 'minus') {
            if (+input.value > 1) {
                input.value = +input.value - 1;
            }
        }
    });
}