import React from 'react'
import Notice from '../Notice'
import styles from './styles'

const BrawlGuideDisclaimer = props => (
  <Notice extend={styles.disclaimer} spacing={{ vertical: 'LARGER' }}>
    {props.children}
  </Notice>
)

export default React.memo(BrawlGuideDisclaimer)
