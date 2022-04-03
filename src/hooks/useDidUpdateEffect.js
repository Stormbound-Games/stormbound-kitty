import React from 'react'

// Custom hook to avoid the wrapped `useEffect` hook from firing on initial
// render.
function useDidUpdateEffect(callback, dependencies) {
  const didMountRef = React.useRef(false)

  React.useEffect(() => {
    if (didMountRef.current) return callback()
    else didMountRef.current = true
    // eslint-disable-next-line
  }, dependencies)
}

export default useDidUpdateEffect
