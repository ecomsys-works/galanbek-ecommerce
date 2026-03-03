/* ------------------------------------------------------------------------------------------------------------------------------
Helpers import
--------------------------------------------------------------------------------------------------------------------------------*/
import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();


/* ------------------------------------------------------------------------------------------------------------------------------
Modules import
--------------------------------------------------------------------------------------------------------------------------------*/
import { initDesktopMenu } from "./modules/DesktopMenu";    // обработчик дестопного меню
import { initOffcanvasMenu } from "./modules/OffcanvasMenu";   // обработчик мобильного меню в хедере
import { initSearchForm } from "./modules/SearchForm";   // обработчик формы поиска

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

import { FilterStore } from './modules/filter/FilterStore.js'  // Стор состояния фильтра 

// import { buildCatalogFormDataFromState } from './modules/filter/CatalogRequestBuilder.js'  // формируем FormData из стора

import { productGallery } from "./modules/product/ProductGallery.js";
import { hoverParallax } from './modules/product/HoverParallax.js';
import { ProductCounter } from "./modules/product/Counter.js";
import { Tabs } from "./modules/product/Tabs.js";
import { RecommendedSwiper } from "./modules/product/RecommendedSwiper.js";

const homePage = document.getElementById('home-page');      // главная
// const catalogPage = document.getElementById('catalog-page');    // страница основных категорий
// const catalogCategoriesPage = document.getElementById('catalog-categories-page');   // страница подкатегорий
const catalogProductsPage = document.getElementById('catalog-products-page');   // страница товаров в категории
const productPage = document.getElementById('product-page');


document.addEventListener('DOMContentLoaded', () => {
    initDesktopMenu();
    initOffcanvasMenu();
    initSearchForm();

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

        const PRICE_RANGE_MIN = 68390;
        const PRICE_RANGE_MAX = 140990;
        const PRICE_STEP = 500;

        breadcrumbsColorizator({
            page: 'catalog-products-page',
            color: '#ffffff',        // цвет фона
            startBreakpoint: 576,  // min-width
            endBreakpoint: 992     // max-width
        });

        initFilterCanvasToggle();

        // стор для фильтра (с сохранением в локалсторадже)
        const storeFilter = new FilterStore({
            rangeMin: PRICE_RANGE_MIN,
            rangeMax: PRICE_RANGE_MAX
        })

        // инит UI обеих сортировок для десктопного фильтра
        const sortCatalog = initSortDesktopCore({ selectId: 'sortCatalog', dropdownClass: 'default' });
        const sortTypes = initSortDesktopCore({ selectId: 'sortTypes', dropdownClass: 'short' });

        // инит UI сортировки sortCatalog для мобильного фильтра
        initSortMobileCanvas({
            selectId: 'sortCatalog',
            canvasId: 'filterCanvas'
        });

        initFilterSidebarAccordion();
        initFilterCanvasAccordion();

        // инит мобильного слайдера цен
        const sliderCanvas = initPriceSliders({
            sliderId: "price-slider-c",
            minLabelId: "price-c-min-label",
            maxLabelId: "price-c-max-label",
            rangeMin: PRICE_RANGE_MIN,
            rangeMax: PRICE_RANGE_MAX,
            startMin: PRICE_RANGE_MIN,
            startMax: PRICE_RANGE_MAX,
            step: PRICE_STEP
        });

        // инит десктопного слайдера цен
        const sliderSidebar = initPriceSliders({
            sliderId: "price-slider-s",
            minLabelId: "price-s-min-label",
            maxLabelId: "price-s-max-label",
            rangeMin: PRICE_RANGE_MIN,
            rangeMax: PRICE_RANGE_MAX,
            startMin: PRICE_RANGE_MIN,
            startMax: PRICE_RANGE_MAX,
            step: PRICE_STEP
        });

        // снхронизируем мобильный и десктопный фильтры
        if (sliderCanvas) storeFilter.registerSlider(sliderCanvas);
        if (sliderSidebar) storeFilter.registerSlider(sliderSidebar);

        // снхронизируем мобильную и десктопную сортировки
        if (sortCatalog) storeFilter.registerSort('sortCatalog', 'catalog');
        if (sortTypes) storeFilter.registerSort('sortTypes', 'type');

    }

    /* ------------------------------------------------------------------------------------------------------------------------------
   CATALOG PRODUCTS PAGE
   --------------------------------------------------------------------------------------------------------------------------------*/
    if (productPage) {
        productGallery({
            mainSelector: ".product-gallery__main",
            thumbsSelector: ".product-gallery__thumbs"
        });
        hoverParallax({ selector: '.product-gallery__main' });

        Fancybox.bind('[data-fancybox="product-gallery"]', {
            animated: true,
            showClass: "fancybox-fadeIn",
            hideClass: "fancybox-fadeOut",

            Toolbar: {
                display: [
                    { id: "counter", position: "center" },
                    "zoom",
                    "fullscreen",
                    "close"
                ]
            },

            Thumbs: {
                autoStart: true
            }
        });

        ProductCounter({ id: 'productForm' });
        Tabs();
        RecommendedSwiper();
    }
})

