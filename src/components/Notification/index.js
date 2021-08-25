import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import styles from './styles'

export default React.memo(function Notification(props) {
  const { css } = useFela()
  const Component = props.as || 'p'

  return props.isVisible ? (
    <Component className={css(styles.notification, props.extend)}>
      {props.icon && <Icon extend={styles.icon} icon={props.icon} />}{' '}
      {props.children}
    </Component>
  ) : null
})
