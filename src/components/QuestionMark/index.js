import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function QuestionMark(props) {
  const { css } = useFela()

  return (
    <span {...props} className={css(styles.mark)}>
      ?
    </span>
  )
})
