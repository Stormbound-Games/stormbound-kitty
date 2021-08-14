import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

export default React.memo(function BlankButton({ extend, label, ...props }) {
  const { css } = useFela()

  return (
    <button
      {...props}
      type={props.type || 'button'}
      className={css(styles.button, extend)}
    >
      {props.children}
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </button>
  )
})
