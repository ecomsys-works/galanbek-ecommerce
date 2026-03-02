export function initPriceSliders({
  sliderId = "price-slider",
  minLabelId = "price-min-label",
  maxLabelId = "price-max-label",
  rangeMin = 0,
  rangeMax = 100000,
  startMin = 1000,
  startMax = 50000,
  step = 100
} = {}) {

  const slider = document.getElementById(sliderId);
  const minLabel = document.getElementById(minLabelId);
  const maxLabel = document.getElementById(maxLabelId);

  if (!slider || !minLabel || !maxLabel) return;

  // Форматер чисел с пробелами
  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(num));
  };

  // Создаём слайдер
  noUiSlider.create(slider, {
    start: [startMin, startMax],
    connect: true,
    step: step,
    range: {
      min: rangeMin,
      max: rangeMax
    },
    tooltips: [true, true],
    format: {
      to: (v) => Math.round(v),
      from: (v) => Number(v)
    }
  });

  // Обновление лейблов при движении бегунка
  slider.noUiSlider.on("update", (values) => {
    const min = Number(values[0]);
    const max = Number(values[1]);

    // === Форматируем с пробелами ===
    minLabel.textContent = formatNumber(min);
    maxLabel.textContent = formatNumber(max);
  });

  // Действия при окончании движения бегунка
  slider.noUiSlider.on("change", (values) => {
    const currentMin = Number(values[0]);
    const currentMax = Number(values[1]);

    console.log("Выбран диапазон:", formatNumber(currentMin), formatNumber(currentMax));

    // Тут можно триггерить фильтрацию товаров
    // Например:
    // filterProductsByPrice(currentMin, currentMax);
  });
}