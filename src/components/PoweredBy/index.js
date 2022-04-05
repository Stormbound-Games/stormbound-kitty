import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import styles from './styles'

export default React.memo(function PoweredBy(props) {
  const { css } = useFela()

  return (
    <Link
      href={props.href}
      target='_blank'
      hideNewTabIndicator
      extend={styles.wrapper}
      title={props.title}
    >
      <span className={css(styles.logoWrapper)} aria-hidden='false'>
        {props.children}
      </span>
      <span className={css(styles.textWrapper)}>
        Powered by&nbsp;<strong>{props.name}</strong>
      </span>
    </Link>
  )
})
