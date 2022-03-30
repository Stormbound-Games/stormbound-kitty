import React from 'react'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = React.useState(initialValue)
  const didMountRef = React.useRef(false)

  React.useEffect(() => {
    // Only update when the value has effectively changed, and not when the hook
    // mounts the first time, otherwise it ends up *always* storing the initial
    // value, overriding anything previously set.
    if (didMountRef.current) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      didMountRef.current = true

      const item = window.localStorage.getItem(key)

      if (typeof item !== 'undefined') {
        try {
          setValue(JSON.parse(item))
        } catch {
          setValue(initialValue)
        }
      }
    }
  }, [key, value, initialValue])

  return [value, setValue]
}

export default useLocalStorage
