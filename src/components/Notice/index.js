import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import styles from './styles'

export default React.memo(function Notice(props) {
  const { css } = useFela()

  return (
    <p className={css(styles.notice, props.extend)}>
      {props.icon && <Icon extend={styles.icon} icon={props.icon} />}{' '}
      {props.children}
    </p>
  )
})
