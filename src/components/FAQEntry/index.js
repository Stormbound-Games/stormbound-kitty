import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import styles from './styles'

export default React.memo(function FAQEntry(props) {
  const { css } = useFela()

  return (
    <>
      <dt className={css(styles.entry)} id={props.id}>
        <Link extend={styles.link} href={'#' + props.id}>
          {props.question}
        </Link>
      </dt>
      <dd className={css(styles.answer)}>{props.answer}</dd>
    </>
  )
})
