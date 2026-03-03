export function Tabs() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-tab]');
        if (!btn) return;

        const tabs = btn.closest('[data-tabs]');
        const tabName = btn.dataset.tab;

        // убираем активность с кнопок
        tabs.querySelectorAll('[data-tab]').forEach(b => {
            b.classList.remove('is-active');
        });

        btn.classList.add('is-active');

        // переключаем контент
        tabs.querySelectorAll('[data-content]').forEach(pane => {
            pane.classList.remove('is-active');
            if (pane.dataset.content === tabName) {
                pane.classList.add('is-active');
            }
        });
    });
}