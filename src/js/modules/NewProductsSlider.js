export function initNewProductsSlider() {
    const newProductsSwiper = new Swiper('.new-products__slider', {
        slidesPerView: 1.7,
        spaceBetween: 15,

        navigation: {
            nextEl: '.new-products__arrow--next',
            prevEl: '.new-products__arrow--prev',
        },

        breakpoints: {
            430: {
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.75,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    });
}