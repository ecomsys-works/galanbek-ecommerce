export function buildCatalogFormDataFromState(state) {
  const formData = new FormData()

  formData.append('price_min', state.price.min)
  formData.append('price_max', state.price.max)

  Object.entries(state).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => formData.append(`${key}[]`, v))
    }
  })

  formData.append('sort', state.sort.catalog)
  formData.append('sort_type', state.sort.type)

  return formData
}