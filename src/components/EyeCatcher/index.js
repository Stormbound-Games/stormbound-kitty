import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

const hasBeenShownYet = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return false
  }
}

export default function EyeCatcher(props) {
  const { css } = useFela()
  const key = 'sb.eye_catcher.' + props.id
  const [isVisible, setIsVisible] = React.useState(!hasBeenShownYet(key))

  React.useEffect(() => {
    localStorage.setItem(key, !isVisible)
  }, [key, isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <p className={css(styles.container)}>
      <span role='img' aria-label='Sparkles'>
        ✨
      </span>{' '}
      {props.children}
      <button
        className={'ButtonAsLink ' + css(styles.close)}
        type='button'
        onClick={() => setIsVisible(false)}
      >
        (Dismiss)
      </button>
    </p>
  )
}
