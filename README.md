
# базовая SCSS структура для проекта 

```bash
scss/
│
├── base/                  # База (глобальные вещи)
│   ├── _reset.scss
│   ├── _fonts.scss        # Гененрируеться при компиляции 
│   ├── _typography.scss
│   ├── _root.scss
│   ├── _base.scss         # body, html, глобальные стили
│   └── ... 
│
├── utils/                 # Всё техническое
│   ├── _boot-generate.js  # исполнительный спец файл для генерации доп. gutters для сетки boot
│   ├── _boot-grid.scss    # сетка
│   ├── _boot-gutters.scss # сгенерированные гутеры
│   ├── _boot-hiddens.scss # доп классы для "скрыть/показать" при адаптиве
│   ├── _mixins.scss         
│   ├── _functions.scss
│   ├── _keyframes.scss    # анимация
│   └── ... 
│  
│
├── layout/                  # Структурные части сайта (глобальные)
│   ├── _container.scss
│   ├── _grid.scss
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _sidebar.scss
│   └── ... 
│
├── components/                        # UI-компоненты (переиспользуемые)
│   ├── _button.scss
│   ├── _category-card.scss            # Карточка категории
│   ├── _filter.scss                   # Компонент фильтра 
│   ├── _breadcrumb.scss               # Хлебные крошки
│   ├── _product-card.scss             # Карточка товара или варианта
│   ├── _sorting.scss
│   └── ...
│
├── sections/                          # Конкретные секции страницы (крупные блоки)
│   ├── _categories-highlights.scss    # Промо / акцентные карточки категорий (популярное, новинки, акции) 
│   ├── _catalog-categories.scss       # Секция категории с карточками подкатегорий
│   ├── _catalog-products.scss         # Секция категории с карточками товаров
│   ├── _catalog-filters.scss          # Фильтры (цена, бренд, параметры)
│   ├── _product-gallery.scss          # Галерея изображений / вариантов на странице товара
│   └── ... 
│
├── pages/                           # Стили конкретных страниц (только структура страницы)
│   ├── _home.scss                   # Главная страница
│   ├── _politico.scss               # Страница политика конфиденциальности
│   ├── _product.scss                # Страница товара   
│   ├── catalog/                          # Ветка категории
│   │     ├── _catalog-categories.scss            # Страница с основными категориями
│   │     ├── _catalog-subcategories.scss         # Страница с подкатегориями
│   │     └── _catalog-products.scss     # Страница подкатегории с товарами
│   └── ...          
│
└── main.scss              # Главный файл сборки
```


# Генерация изображений в форматы webp и avif

```bash
npm run img
```
после генерация появятся две папки внутри папки src/images

# Генерация комплекта гутеров для сетки (пиксель перфект контроль для адаптива)

```bash
npm run gutters
```

# Шрифты конвертирует при старте дев режима автоматически
