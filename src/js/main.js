/* ------------------------------------------------------------------------------------------------------------------------------
Helpers import
--------------------------------------------------------------------------------------------------------------------------------*/
import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();


import autoREM from './helpers/auto-rem';
autoREM(1860, 16);

/* ------------------------------------------------------------------------------------------------------------------------------
Modules import
--------------------------------------------------------------------------------------------------------------------------------*/
import { initDesktopMenu } from "./modules/DesktopMenu";    // обработчик дестопного меню
import { initOffcanvasMenu } from "./modules/OffcanvasMenu";   // обработчик мобильного меню в хедере
import { initSearchForm } from "./modules/SearchForm";   // обработчик формы поиска
import { CartModal } from "./modules/cart/CartModal.js";

import { initMapOverlayDesktop } from "./modules/map/MapOverlayDesktop.js";   // обработчик карты для десктопа
import { initMapOverlayMobile } from "./modules/map/MapOverlayMobile.js";  // обработчик карты для мобилки

import { initNewProductsSlider } from "./modules/NewProductsSlider";  // слайдер новые товары

import { initFilterCanvasToggle } from "./modules/filter/FilterCanvasToggle.js";  // обработчик закрыть/открыть мобильный фильтр 
import { breadcrumbsColorizator } from "./modules/BreadcrumbsColorizator";   // меняет фон хлебных крошек 576-992 на белый

import { initFilterSidebarAccordion } from "./modules/filter/FilterSidebarAccordion.js"; // Обработчик десктопных аккордионов фильтра
import { initFilterCanvasAccordion } from "./modules/filter/FilterCanvasAccordion.js";  // Обработчик мобильных аккордионов фильтра

import { initSortMobileCanvas } from "./modules/filter/SortMobileCore.js";   // Обработчик UI для мобильной сортировки
import { initSortDesktopCore } from "./modules/filter/SortDesktopCore.js";   // Обработчик UI для десктопной сортировки
import { initPriceSliders } from './modules/filter/PriceSlider.js';   // Инициализирует слайдеры цен (мобильный, десктопный)

// import { FilterStore } from './modules/filter/FilterStore.js'  // Стор состояния фильтра 

import { FilterCheckboxesStore } from './modules/filter/FilterCheckboxesStore.js'
import { initFilterUI, syncUIFromForm } from './modules/filter/initFilterUI.js'

// import { buildCatalogFormDataFromState } from './modules/filter/CatalogRequestBuilder.js'  // формируем FormData из стора

import { productGallery } from "./modules/product/ProductGallery.js";
import { hoverParallax } from './modules/product/HoverParallax.js';
import { ProductCounter } from "./modules/product/Counter.js";
import { Tabs } from "./modules/product/Tabs.js";
import { RecommendedSwiper } from "./modules/product/RecommendedSwiper.js";
import { initFancy } from "./modules/FancyBox.js";
// import { handleForm } from "./modules/product/handleForm.js";
import { handleCartProduct } from "./modules/product/handleCartProduct.js";
import { cartSwiper } from "./modules/cart/CartSwiper.js";
import { headerColorizator } from "./modules/HeaderColorizator.js";

import { ScrollAnimations } from "./modules/GSAPScroll.js";
import { initTownSelect } from './modules/TownSelect.js';
import { initCardCounterTeleport } from "./modules/cart/CardCounterTeleport.js";
import { initCartSelectAll } from "./modules/cart/initCartSelectAll.js";
import { initCartFormValidation } from "./modules/cart/initCartFormValidation.js";


const homePage = document.getElementById('home-page');      // главная
// const catalogPage = document.getElementById('catalog-page');    // страница основных категорий
// const catalogCategoriesPage = document.getElementById('catalog-categories-page');   // страница подкатегорий
const catalogProductsPage = document.getElementById('catalog-products-page');   // страница товаров в категории
const productPage = document.getElementById('product-page');


document.addEventListener('DOMContentLoaded', () => {
    initDesktopMenu();
    initOffcanvasMenu();
    initSearchForm();
    CartModal();
    cartSwiper();

    headerColorizator({
        page: 'politico-page'
    })



    // gsap animation class init
    window.addEventListener('load', () => {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
            ScrollAnimations.init();
        }

        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hidden'); // запускаем плавное исчезновение
            setTimeout(() => splash.remove(), 700); // удаляем из DOM
        }
    });

    initTownSelect({ selectId: 'townSelect' });
    initCardCounterTeleport({
        breakpoint: 767
    });
    initCartSelectAll();
    initCartFormValidation();

    const phoneInput1 = document.getElementById('phone-mask-1');
    const im1 = new Inputmask("+7 (999) 999-99-99");
    im1.mask(phoneInput1);



    /* ------------------------------------------------------------------------------------------------------------------------------
    HOME PAGE
    --------------------------------------------------------------------------------------------------------------------------------*/
    if (homePage) {
        initNewProductsSlider();
        initMapOverlayDesktop();
        initMapOverlayMobile();
    }

    /* ------------------------------------------------------------------------------------------------------------------------------
    CATALOG PRODUCTS PAGE
    --------------------------------------------------------------------------------------------------------------------------------*/
    if (catalogProductsPage) {
        // -------------------------
        // БРЕДКРАМБС
        // -------------------------
        breadcrumbsColorizator({
            page: 'catalog-products-page',
            color: '#ffffff',
            startBreakpoint: 576,
            endBreakpoint: 992
        });

        // -------------------------
        // ИНПУТЫ СЛАЙДЕРА
        // -------------------------
        const priceMinInput = document.querySelector('[data-price-min]');
        const priceMaxInput = document.querySelector('[data-price-max]');
        const DEFAULT_MIN = priceMinInput ? parseInt(priceMinInput.value, 10) : 68390;
        const DEFAULT_MAX = priceMaxInput ? parseInt(priceMaxInput.value, 10) : 140990;
        const PRICE_STEP = 500;

        // -------------------------
        // STORE
        // -------------------------
        const formId = 'catalogForm';
        const store = new FilterCheckboxesStore({ formId });
        const form = document.getElementById(formId);

        // -------------------------
        // ЗАГРУЗКА СОХРАНЕННЫХ ЗНАЧЕНИЙ
        // -------------------------
        const savedData = store.getFormData ? Object.fromEntries(store.getFormData()) : {};
        const startMin = savedData.price_min ? parseInt(savedData.price_min, 10) : DEFAULT_MIN;
        const startMax = savedData.price_max ? parseInt(savedData.price_max, 10) : DEFAULT_MAX;

        if (priceMinInput) priceMinInput.value = startMin;
        if (priceMaxInput) priceMaxInput.value = startMax;

        ['sortCatalog', 'sortTypes'].forEach(id => {
            const select = document.getElementById(id);
            if (!select) return;
            const savedValue = savedData[select.name];
            if (savedValue) select.value = savedValue;
        });

        // -------------------------
        // UI ФИЛЬТРОВ
        // -------------------------
        initFilterCanvasToggle();

        // Десктопные сортировки
        initSortDesktopCore({ selectId: 'sortCatalog', dropdownClass: 'default' });
        initSortDesktopCore({ selectId: 'sortTypes', dropdownClass: 'short' });

        // Мобильная сортировка в канвасе
        initSortMobileCanvas({ selectId: 'sortCatalog', canvasId: 'filterCanvas' });

        // -------------------------
        // ИНИЦИАЛИЗАЦИЯ UI ФИЛЬТРОВ (ЧЕКБОКСЫ)
        // -------------------------
        initFilterUI({ formId });
        syncUIFromForm(form);

        // -------------------------
        // АККОРДЕОНЫ — ТОЛЬКО ПОСЛЕ ГЕНЕРАЦИИ UI
        // -------------------------
        initFilterSidebarAccordion();
        initFilterCanvasAccordion();

        // -------------------------
        // СЛАЙДЕРЫ ЦЕН
        // -------------------------
        const sliderCanvas = initPriceSliders({
            sliderId: "price-slider-c",
            minLabelId: "price-c-min-label",
            maxLabelId: "price-c-max-label",
            rangeMin: DEFAULT_MIN,
            rangeMax: DEFAULT_MAX,
            startMin,
            startMax,
            step: PRICE_STEP
        });

        const sliderSidebar = initPriceSliders({
            sliderId: "price-slider-s",
            minLabelId: "price-s-min-label",
            maxLabelId: "price-s-max-label",
            rangeMin: DEFAULT_MIN,
            rangeMax: DEFAULT_MAX,
            startMin,
            startMax,
            step: PRICE_STEP
        });

        // -------------------------
        // ДЕБАУНС ДЛЯ СИНХРОНИЗАЦИИ СЛАЙДЕРОВ
        // -------------------------
        const debounceSync = (() => {
            let syncTimeout;
            return () => {
                clearTimeout(syncTimeout);
                syncTimeout = setTimeout(() => {
                    const min = parseInt(priceMinInput.value, 10);
                    const max = parseInt(priceMaxInput.value, 10);

                    if (sliderCanvas) {
                        const [cMin, cMax] = sliderCanvas.get().map(v => Math.round(v));
                        if (cMin !== min || cMax !== max) sliderCanvas.set([min, max], false);
                    }
                    if (sliderSidebar) {
                        const [sMin, sMax] = sliderSidebar.get().map(v => Math.round(v));
                        if (sMin !== min || sMax !== max) sliderSidebar.set([min, max], false);
                    }

                    store.save();
                }, 500);
            };
        })();

        const onSliderSet = (values) => {
            const [min, max] = values.map(v => Math.round(v));
            if (priceMinInput) priceMinInput.value = min;
            if (priceMaxInput) priceMaxInput.value = max;
            store.save();
            debounceSync();
        };

        if (sliderCanvas) sliderCanvas.on('set', onSliderSet);
        if (sliderSidebar) sliderSidebar.on('set', onSliderSet);

        // -------------------------
        // СИНХРОНИЗАЦИЯ СЕЛЕКТОВ
        // -------------------------
        ['sortCatalog', 'sortTypes'].forEach(id => {
            const selects = document.querySelectorAll(`#${id}`);
            selects.forEach(select => {
                select.addEventListener('change', () => {
                    store.save();
                });
            });
        });
    }

    /* ------------------------------------------------------------------------------------------------------------------------------
   CATALOG PRODUCTS PAGE
   --------------------------------------------------------------------------------------------------------------------------------*/
    if (productPage) {
        productGallery({
            mainSelector: ".product-gallery__main",
            thumbsSelector: ".product-gallery__thumbs"
        });

        hoverParallax({
            selector: '.product-gallery__main'
        });

        initFancy({
            dataAttr: '[data-fancybox="product-gallery"]'
        })

        ProductCounter({ id: 'productForm' });
        Tabs();

        RecommendedSwiper({
            selector: '.recommended__slider'
        });


        handleCartProduct({
            cartBtnId: "cart-btn",
            log: true
        });

    }
})

