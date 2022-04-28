import React from 'react'
import { useFela } from 'react-fela'
import Label from '~/components/Label'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

function Select({ hideLabel, extend, label, ...props }, ref) {
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
      <select
        {...props}
        name={name}
        className={css(styles.select, extend)}
        ref={ref}
      >
        {props.children}
      </select>
    </>
  )
}

export default React.memo(React.forwardRef(Select))
