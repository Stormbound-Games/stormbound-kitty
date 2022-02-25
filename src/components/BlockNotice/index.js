import React from 'react'
import Notice from '~/components/Notice'
import styles from './styles'

export default React.memo(function BrawlGuideDisclaimer(props) {
  return (
    <Notice extend={styles.disclaimer} spacing={{ vertical: 'LARGER' }}>
      {props.children}
    </Notice>
  )
})
