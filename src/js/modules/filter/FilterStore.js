import { buildCatalogFormDataFromState } from "./CatalogRequestBuilder"   // формируем FormData из стора

export class FilterStore {
  constructor(options) {
    this.storageKey = 'catalogFilters'

    this.state = {
      price: {
        min: options.rangeMin,
        max: options.rangeMax
      },
      memory: [],
      model: [],
      color: [],
      sim: [],
      sort: {
        catalog: 'default-desc',
        type: 'all'
      }
    }

    this.sliders = []
    this.load()
    this.initCheckboxes()

    // если нужно автоматический запрос на сервер
    this.initAutoFetch()
  }

  /* ---------------- INIT SLIDER ---------------- */

  registerSlider(instance) {
    this.sliders.push(instance)

    instance.on('change', (values) => {
      const min = Math.round(values[0])
      const max = Math.round(values[1])
      this.updatePrice(min, max)
    })

    // выставляем сохранённые значения
    instance.set([this.state.price.min, this.state.price.max])
  }

  /* ---------------- UPDATE PRICE ---------------- */

  updatePrice(min, max) {
    this.state.price.min = min
    this.state.price.max = max

    this.syncSliders()
    this.save()
    // this.log()

    // если нужно автоматический запрос на сервер
    this.triggerFetch()
  }

  syncSliders() {
    this.sliders.forEach(slider => {
      const current = slider.get().map(v => Math.round(v))

      if (
        current[0] !== this.state.price.min ||
        current[1] !== this.state.price.max
      ) {
        slider.set([this.state.price.min, this.state.price.max])
      }
    })
  }


  /* ---------------- SORT ---------------- */
  registerSort(selectId, stateKey) {
    const select = document.getElementById(selectId)
    if (!select) return

    // выставляем сохранённое значение
    select.value = this.state.sort[stateKey]

    select.addEventListener('change', () => {
      this.state.sort[stateKey] = select.value
      this.save()
      // this.log()


      // если нужно автоматический запрос на сервер
      this.triggerFetch()
    })
  }

  /* ---------------- CHECKBOXES ---------------- */

  initCheckboxes() {
    document.addEventListener('change', (e) => {
      const input = e.target
      if (!input.matches('[data-filter-group]')) return

      const group = input.dataset.filterGroup
      const value = input.value

      if (input.checked) {
        if (!this.state[group].includes(value)) {
          this.state[group].push(value)
        }
      } else {
        this.state[group] = this.state[group].filter(v => v !== value)
      }

      this.syncCheckboxes()
      this.save()
      // this.log()

      // если нужно автоматический запрос на сервер
      this.triggerFetch()
    })

    this.syncCheckboxes()
  }

  syncCheckboxes() {
    document.querySelectorAll('[data-filter-group]').forEach(input => {
      const group = input.dataset.filterGroup
      input.checked = this.state[group].includes(input.value)
    })
  }

  /* ---------------- STORAGE ---------------- */

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state))
  }

  load() {
    const saved = localStorage.getItem(this.storageKey)

    if (!saved) return

    const parsed = JSON.parse(saved)

    this.state = {
      ...this.state,          // дефолтная структура
      ...parsed,              // сохранённые данные
      sort: {
        ...this.state.sort,   // дефолт sort
        ...(parsed.sort || {}) // если sort был сохранён
      }
    }
  }
  /* ---------------- AUTO FETCH ---------------- */

  initAutoFetch() {
    this.abortController = null
    this.fetchTimeout = null
  }

  triggerFetch() {
    clearTimeout(this.fetchTimeout)

    this.fetchTimeout = setTimeout(() => {
      this.request()
    }, 300) // debounce 300ms
  }

  // Пример запроса (нужно изменить под себя)
  request() {
    // отменяем предыдущий "запрос"
    if (this.abortController) {
      this.abortController.abort()
    }

    this.abortController = new AbortController()
    // формируем FormData из текущего state
    const formData = buildCatalogFormDataFromState(this.getState())

    console.log('FORM DATA TO SERVER:')
    // Для наглядности выводим пары ключ-значение
    for (let pair of formData.entries()) {
      console.log(pair[0], '=', pair[1])
    }

    // вот здесь можно потом раскомментировать настоящий fetch
    /*
    fetch('/api/catalog', {
        method: 'POST',
        body: formData,
        signal: this.abortController.signal
    })
    */

    // имитация задержки сервера
    console.log('loading...')
    setTimeout(() => {
      if (this.abortController.signal.aborted) return
      console.log('SERVER RESPONSE OK, products updated\n')
    }, 800)
  }

  /* ---------------- DEBUG ---------------- */

  log() {
    console.log('FILTER STATE:', JSON.parse(JSON.stringify(this.state)))
  }

  /* ---------------- GET STATE ---------------- */

  getState() {
    return this.state
  }
}