import React from 'react'
import { useFela } from 'react-fela'
import Label from '~/components/Label'
import Only from '~/components/Only'
import styles from './styles'

export default React.memo(function MobileTogglableContent(props) {
  const { css } = useFela()

  return (
    <>
      <Only.Desktop>{props.children}</Only.Desktop>
      <Only.Mobile>
        <details className={css(styles.details)}>
          <Label as='summary' extend={styles.summary}>
            {props.label}
          </Label>
          <div className={css(styles.content)}>{props.children}</div>
        </details>
      </Only.Mobile>
    </>
  )
})
