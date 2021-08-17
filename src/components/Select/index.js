import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(
  React.forwardRef(function Select(
    { hideLabel, extend, label, ...props },
    ref
  ) {
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
  })
)
