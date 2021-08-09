import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function ButtonIcon(props) {
  const { css } = useFela()

  return (
    <button
      {...props}
      className={[css(styles.button, props.extend), props.className]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </button>
  )
})
