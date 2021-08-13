import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Icon(props) {
  const { css } = useFela({ type: props.icon })

  return (
    <svg
      className={css(styles.icon, props.extend)}
      aria-hidden
      focusable='false'
      viewBox='0 0 32 32'
    >
      <use xlinkHref={`#icon-${props.icon}`} />
    </svg>
  )
})
