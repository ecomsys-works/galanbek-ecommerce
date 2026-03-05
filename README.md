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
├── layout/                  # Структурные части сайта (глобальные)
│   ├── _container.scss
│   ├── _catalog.scss
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _product.scss
│   └── ...
│
├── components/                        # UI-компоненты (переиспользуемые)
│   └── ...
│
├── sections/                          # секции для страниц (крупные блоки)
│   └── ...
│
├── layouts/                           # Лейауты
│   └── ...
│
├── utils/                 # Всё техническое
│   └── ...
│
└── main.scss              # Главный файл сборки
```

# ЧТОБЫ ФИЛЬТР ЗАРАБОТАЛ НАЙТИ form id="catalogForm" на странице catalog-products.html

```html
<form id="catalogForm" class="catalog__form" action="/catalog" method="GET">...</form>
```

# СЕРВЕР ДОЛЖЕН ВЕРНУТЬ ВОТ ПРИМЕРНО ВОТ ТАКУЮ РАЗМЕТКУ ИЗ СКРЫТЫХ ИНПУТОВ (ГЛАВНОЕ DATA АТТРИБУТЫ НЕ МЕНЯТЬ, НУЖНО ДЛЯ JS !) 
# В ФОРМУ ТОГДА СКРИТП ВСЕ ПОДХВАТИТ И СГЕНЕРИРУЕТ МОБИЛЬНЫЙ И ДЕСКТОНЫЙ ФИЛЬТРЫ 
# также стор в локалсторидже - retailFilters 

```html
<!-- Сортировка каталога -->
<select class="sort-native" name="sort" id="sortCatalog" data-sort-select data-sort-id="sortCatalog" hidden>
	<option value="default-desc" selected>Сначала популярные</option>
	<option value="default-asc">Сначала новые</option>
	<option value="price-asc">Цена: по возрастанию</option>
	<option value="price-desc">Цена: по убыванию</option>
	<option value="discount-desc">Сначала со скидкой</option>
	<option value="rating-desc">Лучшие по рейтингу</option>
</select>

<!-- Тип сортировки -->
<select class="sort-native" name="sort_type" id="sortTypes" data-sort-select data-sort-id="sortTypes" hidden>
	<option value="all" selected>Все типы</option>
	<option value="newest">Новые поступления</option>
	<option value="popular">Популярные</option>
	<option value="sale">Со скидкой</option>
	<option value="recommended">Рекомендовано</option>
</select>

<input type="hidden" name="price_min" value="68390" data-price-min />
<input type="hidden" name="price_max" value="140990" data-price-max />

<!-- Для чекбоксов указываем группы категории data-group -->
<!-- MEMORY -->
<input type="checkbox" name="memory[]" value="256" hidden data-group="Память" />
<input type="checkbox" name="memory[]" value="512" hidden data-group="Память" />

<!-- Model -->
<input type="checkbox" name="model[]" value="iPhone 14" hidden data-group="Модель" />
<input type="checkbox" name="model[]" value="iPhone 13" hidden data-group="Модель" />
<input type="checkbox" name="model[]" value="iPhone 12" hidden data-group="Модель" />

<!-- COLOR -->
<input type="checkbox" name="color[]" value="black" hidden data-group="Цвет" />
<input type="checkbox" name="color[]" value="white" hidden data-group="Цвет" />
<input type="checkbox" name="color[]" value="gold" hidden data-group="Цвет" />

<!-- SIM -->
<input type="checkbox" name="sim[]" value="single" hidden data-group="SIM" />
<input type="checkbox" name="sim[]" value="dual" hidden data-group="SIM" />
<input type="checkbox" name="sim[]" value="esim" hidden data-group="SIM" />
```
