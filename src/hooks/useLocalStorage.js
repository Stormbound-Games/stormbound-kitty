import React from 'react'

const useLocalStorage = (key, initialValue) => {
  const readValue = React.useCallback(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [key, initialValue])

  // We could avoid a flash of initial value by passing `readValue` as the
  // initial state getter, but that causes a React mismatch because the server
  // pass uses the initial value, while the first client pass uses the stored
  // value, thus failing reconciliation.
  const [storedValue, setStoredValue] = React.useState(initialValue)

  const setValue = React.useCallback(
    value => {
      if (typeof window == 'undefined') {
        console.warn(
          `Tried setting localStorage key “${key}” outside of the browser.`
        )
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value

        window.localStorage.setItem(key, JSON.stringify(newValue))

        setStoredValue(newValue)

        window.dispatchEvent(new Event('local-storage'))
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error)
      }
    },
    [storedValue, key]
  )

  const handleStorageChange = React.useCallback(
    () => setStoredValue(readValue()),
    [readValue]
  )

  React.useEffect(() => handleStorageChange(), [handleStorageChange])

  React.useEffect(() => {
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [handleStorageChange])

  return [storedValue, setValue]
}

export default useLocalStorage
