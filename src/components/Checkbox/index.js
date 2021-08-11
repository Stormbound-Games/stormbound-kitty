import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Checkbox(props) {
  const { css } = useFela({
    isDisabled: props.disabled,
    isChecked: props.checked,
  })

  return (
    <label className={css(styles.checkbox, props.extend)} htmlFor={props.id}>
      <input
        form={props.form}
        type='checkbox'
        {...props}
        children={undefined}
        className={css(styles.input)}
      />
      <span className={css(styles.icon)} />
      <span className={css(styles.label)}>{props.children}</span>
    </label>
  )
})
