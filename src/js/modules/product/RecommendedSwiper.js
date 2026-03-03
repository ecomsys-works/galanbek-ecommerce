export function RecommendedSwiper(options) {
    const selector = options?.selector || '.recommended-products__slider';
    const recommendedSwiper = new Swiper(selector, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.recommended-products__arrow--next',
            prevEl: '.recommended-products__arrow--prev',
        },
        breakpoints: {
            576: { // SM-GL
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: { // LG-XL
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: { // Desktop
                slidesPerView: 5,
                spaceBetween: 20,
            }
        }
    });
    return recommendedSwiper;
}