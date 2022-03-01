import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import BlocksRenderer from '~/components/BlocksRenderer'
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
      <dd className={css(styles.answer)}>
        {Array.isArray(props.answer) || props.answer._type === 'block' ? (
          <BlocksRenderer value={props.answer} />
        ) : (
          props.answer
        )}
      </dd>
    </>
  )
})
