import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function FAQEntry(props) {
  const { css } = useFela()

  return (
    <>
      <dt className={css(styles.entry)} id={props.id}>
        <a className={css(styles.link)} href={'#' + props.id}>
          {props.question}
        </a>
      </dt>
      <dd className={css(styles.answer)}>{props.answer}</dd>
    </>
  )
})
