import React from 'react'

const useOnce = effect => {
  const hasRun = React.useRef(false)

  React.useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true
      effect()
    }
  }, [effect])
}

export default useOnce
