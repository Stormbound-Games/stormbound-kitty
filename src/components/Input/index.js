import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

export default React.memo(function Input({
  hideLabel,
  extend,
  label,
  ...props
}) {
  const { css } = useFela()
  const name = props.name || props.id

  return (
    <>
      {hideLabel ? (
        <VisuallyHidden as='label' htmlFor={props.id}>
          {label}
        </VisuallyHidden>
      ) : (
        <label htmlFor={props.id} className={css(styles.label)}>
          {label}
        </label>
      )}
      <input
        type='text'
        {...props}
        name={name}
        className={css(styles.input, extend)}
      />
    </>
  )
})
