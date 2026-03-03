export function productGallery(options) {

    const main = document.querySelector(options?.mainSelector) || document.querySelector('.product-gallery__main');
    const thumbs = document.querySelector(options?.thumbsSelector) || document.querySelector('.product-gallery__thumbs');

    // === Thumbs Swiper ===
    const thumbsSwiper = new Swiper('.product-gallery__thumbs', {
        direction: window.innerWidth >= 640 ? 'vertical' : 'horizontal',
        slidesPerView: 5,
        spaceBetween: 15,
        autoHeight: false,
        watchSlidesProgress: true,
        lazy: true,
        breakpoints: {
            0: { direction: 'horizontal', slidesPerView: 5, spaceBetween: 10 },
            640: { direction: 'vertical', slidesPerView: 5, spaceBetween: 10 },
            1200: { direction: 'vertical', slidesPerView: 5, spaceBetween: 15 }
        }
    });

    // === Main Swiper ===
    const mainSwiper = new Swiper('.product-gallery__main', {
        slidesPerView: 1,
        autoHeight: false,
        lazy: true,
        navigation: {
            nextEl: '.product-gallery__arrow--next',
            prevEl: '.product-gallery__arrow--prev',
        },
        thumbs: { swiper: thumbsSwiper },
        on: {
            init(swiper) { updateArrows(swiper); syncThumbsHeight(); },
            slideChange(swiper) { updateArrows(swiper); }
        }
    });

    function updateArrows(swiper) {
        const prev = document.querySelector('.product-gallery__arrow--prev');
        const next = document.querySelector('.product-gallery__arrow--next');
        prev.disabled = swiper.isBeginning;
        next.disabled = swiper.isEnd;
    }

    // === Sync main + thumbs heights ===
    function syncThumbsHeight() {
        if (!main || !thumbs) return;

        if (window.innerWidth >= 640) {
            main.style.height = main.offsetWidth + 'px';
            thumbs.style.height = main.offsetHeight + 'px';
        } else {
            main.style.removeProperty('height');
            thumbs.style.removeProperty('height');
        }
    }

    // === ResizeObserver для стабильной синхронизации ===
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(syncThumbsHeight);
        ro.observe(main);
    }

    // === fallback на resize ===
    window.addEventListener('resize', () => {
        requestAnimationFrame(() => {
            mainSwiper.update();
            thumbsSwiper.update();
            syncThumbsHeight();
        });
    });

    // === Initial sync ===
    window.addEventListener('load', () => {
        syncThumbsHeight();
        mainSwiper.update();
        thumbsSwiper.update();
    });

    return {
        arrowPrevGallery: document.querySelector('.product-gallery__arrow--prev'),
        arrowNextGallery: document.querySelector('.product-gallery__arrow--next'),
        mainGallerySwiper: mainSwiper,
        thumbsGallerySwiper: thumbsSwiper
    }
}