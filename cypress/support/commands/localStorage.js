const LOCAL_STORAGE_MEMORY = {}

export const saveLocalStorage = () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage.getItem(key)
  })
}

export const restoreLocalStorage = () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
}
