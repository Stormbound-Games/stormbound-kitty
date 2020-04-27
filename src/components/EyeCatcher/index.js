import React from 'react'
import './index.css'

const hasBeenShownYet = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return false
  }
}

export default function EyeCatcher(props) {
  const key = 'sb.eye_catcher.' + props.id
  const [isVisible, setIsVisible] = React.useState(!hasBeenShownYet(key))

  React.useEffect(() => {
    localStorage.setItem(key, !isVisible)
  }, [key, isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <p className='EyeCatcher'>
      <span role='img' aria-label='Sparkles'>
        ✨
      </span>{' '}
      {props.children}
      <button
        className='ButtonAsLink EyeCatcher__close'
        type='button'
        onClick={() => setIsVisible(false)}
      >
        (Dismiss)
      </button>
    </p>
  )
}
