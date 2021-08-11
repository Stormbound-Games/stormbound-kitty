import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.forwardRef(function QuestionMark(props, ref) {
  const { css } = useFela()

  return (
    <span ref={ref} {...props} className={css(styles.mark)}>
      ?
    </span>
  )
})
