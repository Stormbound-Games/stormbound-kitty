import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import styles from './styles'

export default React.memo(function Notification(props) {
  const { css } = useFela()

  return props.isVisible ? (
    <p className={css(styles.notification)}>
      {props.icon && <Icon extend={styles.icon} icon={props.icon} />}{' '}
      {props.children}
    </p>
  ) : null
})
