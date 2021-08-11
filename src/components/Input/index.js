import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

const Input = ({ isLabelHidden, extend, label, ...props }, ref) => {
  const { css } = useFela()

  return (
    <>
      {isLabelHidden ? (
        <VisuallyHidden as='label' htmlFor={props.id}>
          {label}
        </VisuallyHidden>
      ) : (
        <label htmlFor={props.id} className={css(styles.label)}>
          {label}
        </label>
      )}
      <input {...props} className={css(styles.input, extend)} ref={ref} />
    </>
  )
}

export default React.memo(React.forwardRef(Input))
