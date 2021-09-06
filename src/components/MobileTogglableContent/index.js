import React from 'react'
import { useFela } from 'react-fela'
import Only from '~/components/Only'
import styles from './styles'

export default React.memo(function MobileTogglableContent(props) {
  const { css } = useFela()

  return (
    <>
      <Only.Desktop>{props.children}</Only.Desktop>
      <Only.Mobile>
        <details className={css(styles.details)}>
          <summary className={css(styles.summary)}>{props.label}</summary>
          <div className={css(styles.content)}>{props.children}</div>
        </details>
      </Only.Mobile>
    </>
  )
})
