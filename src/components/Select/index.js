import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

const Select = ({ isLabelHidden, extend, label, ...props }, ref) => {
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
      <select {...props} className={css(styles.select, extend)} ref={ref}>
        {props.children}
      </select>
    </>
  )
}

export default React.memo(React.forwardRef(Select))
