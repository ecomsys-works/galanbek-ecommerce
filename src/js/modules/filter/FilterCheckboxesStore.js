export class FilterCheckboxesStore {
  constructor({ formId }) {
    this.form = document.getElementById(formId)
    if (!this.form) {
      console.warn('Форма не найдена')
      return
    }

    this.storageKey = 'retailFilters'
    this.abortController = null
    this.fetchTimeout = null

    this.load()
    this.initListeners()
  }

  /* ---------------------------------- */
  /* LISTENERS                          */
  /* ---------------------------------- */

  initListeners() {
    // Любое изменение внутри формы
    this.form.addEventListener('change', (e) => {
      const target = e.target

      if (!target.name) return

      // если есть дубли input (sidebar + canvas)
      this.syncDuplicateInputs(target)

      this.save()
      this.triggerFetch()
    })
  }

  /* ---------------------------------- */
  /* SYNC DUPLICATES                    */
  /* ---------------------------------- */

  syncDuplicateInputs(changedInput) {
    const { name, value, type } = changedInput

    // Для checkbox / radio
    if (type === 'checkbox' || type === 'radio') {
      document.querySelectorAll(
        `input[name="${name}"][value="${value}"]`
      ).forEach(input => {
        input.checked = changedInput.checked
      })
    }

    // Для select
    if (changedInput.tagName === 'SELECT') {
      document.querySelectorAll(
        `select[name="${name}"]`
      ).forEach(select => {
        select.value = changedInput.value
      })
    }
  }

  /* ---------------------------------- */
  /* FORM DATA                          */
  /* ---------------------------------- */

  getFormData() {
    return new FormData(this.form)
  }

  /* ---------------------------------- */
  /* STORAGE                            */
  /* ---------------------------------- */

  save() {
  clearTimeout(this._saveTimeout)
  this._saveTimeout = setTimeout(() => {
    const data = [...this.getFormData()]
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }, 100) // 100ms задержка
}

  load() {
    const saved = localStorage.getItem(this.storageKey)
    if (!saved) return

    const entries = JSON.parse(saved)

    entries.forEach(([name, value]) => {
      const input = this.form.querySelector(
        `[name="${name}"][value="${value}"]`
      )

      if (!input) {
        const hidden = this.form.querySelector(`[name="${name}"]`)
        if (hidden) hidden.value = value
        return
      }

      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = true
      } else {
        input.value = value
      }
    })
  }

  /* ---------------------------------- */
  /* AUTO FETCH                         */
  /* ---------------------------------- */

  triggerFetch() {
    clearTimeout(this.fetchTimeout)

    this.fetchTimeout = setTimeout(() => {
      this.request()
    }, 300)
  }

  request() {
    if (this.abortController) {
      this.abortController.abort()
    }

    this.abortController = new AbortController()

    const formData = this.getFormData()

    console.log('FORM DATA TO SERVER:')
    for (let pair of formData.entries()) {
      console.log(pair[0], '=', pair[1])
    }

    console.log('loading...')

    setTimeout(() => {
      if (this.abortController.signal.aborted) return
      console.log('SERVER RESPONSE OK, products updated\n')
    }, 800)

    /*
    fetch('/api/catalog', {
      method: 'POST',
      body: formData,
      signal: this.abortController.signal
    })
    */
  }
}