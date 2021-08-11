import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Checkbox(props) {
  const name = props.name || props.id
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
        name={name}
        children={undefined}
        className={css(styles.input)}
      />
      <span className={css(styles.icon)} />
      <span className={css(styles.label)}>{props.children}</span>
    </label>
  )
})
