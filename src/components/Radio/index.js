import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Radio({ children, extend, ...props }) {
  const { css } = useFela({
    isChecked: props.checked,
    isDisabled: props.disabled,
  })

  return (
    <label className={css(styles.radio, extend)} htmlFor={props.id}>
      <input type='radio' {...props} className={css(styles.input)} />
      <span className={css(styles.icon)} />
      <span className={css(styles.label)}>{children}</span>
    </label>
  )
})
