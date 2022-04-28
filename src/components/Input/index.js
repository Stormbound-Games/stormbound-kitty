import React from 'react'
import { useFela } from 'react-fela'
import Label from '~/components/Label'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

function Input({ hideLabel, extend, label, ...props }, ref) {
  const { css } = useFela()
  const name = props.name || props.id

  return (
    <>
      {hideLabel ? (
        <VisuallyHidden as='label' htmlFor={props.id}>
          {label}
        </VisuallyHidden>
      ) : (
        <Label htmlFor={props.id} disabled={props.disabled}>
          {label}
        </Label>
      )}
      <input
        type='text'
        {...props}
        name={name}
        className={css(styles.input, extend)}
        ref={ref}
      />
    </>
  )
}

export default React.memo(React.forwardRef(Input))
