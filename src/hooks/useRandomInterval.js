import React from 'react'
import random from '../helpers/random'

const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = React.useRef(null)
  const savedCallback = React.useRef(callback)

  React.useEffect(() => {
    savedCallback.current = callback
  })

  React.useEffect(() => {
    if (typeof minDelay === 'number' && typeof maxDelay === 'number') {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }

    return () => window.clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])

  return React.useCallback(function () {
    window.clearTimeout(timeoutId.current)
  }, [])
}

export default useRandomInterval
