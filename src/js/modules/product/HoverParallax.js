// hoverParallaxMainFixed.js
export function hoverParallax(options) {
  const mainSlider = document.querySelector(options?.el) || document.querySelector('.product-gallery__main');
  if (!mainSlider) return;

  mainSlider.addEventListener('click', () => {
    const activeSlide = mainSlider.querySelector('.swiper-slide-active img');
    if (activeSlide) {
      activeSlide.style.transform = 'translate(0,0) scale(1)';
    }
  });

  mainSlider.addEventListener('mousemove', e => {
    const activeSlide = mainSlider.querySelector('.swiper-slide-active');
    if (!activeSlide) return;

    const img = activeSlide.querySelector('img');
    if (!img) return;

    const rect = activeSlide.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxTranslate = 18; // макс смещение
    const offsetX = -((x / rect.width) - 0.5) * 2 * maxTranslate;
    const offsetY = -((y / rect.height) - 0.5) * 2 * maxTranslate;

    img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.1)`;
  });

  mainSlider.addEventListener('mouseleave', () => {
    const activeSlide = mainSlider.querySelector('.swiper-slide-active');
    if (!activeSlide) return;

    const img = activeSlide.querySelector('img');
    if (!img) return;

    img.style.transform = 'translate(0,0) scale(1)';
  });

}