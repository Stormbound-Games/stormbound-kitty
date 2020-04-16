const KEY = 'sk.collection'

const Collection = {
  save: value => {
    window.localStorage.setItem(KEY, JSON.stringify(value))
  },
  load: () => {
    try {
      return JSON.parse(window.localStorage.getItem(KEY))
    } catch (err) {
      return null
    }
  },
  exists: () => {
    try {
      return JSON.parse(window.localStorage.getItem(KEY)).length > 0
    } catch (error) {
      return false
    }
  },
  clear: () => {
    window.localStorage.removeItem(KEY)
  },
}

export default Collection
