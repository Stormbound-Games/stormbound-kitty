import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import useSpacing from '../../hooks/useSpacing'
import styles from './styles'

export default React.memo(function Notice(props) {
  const { css } = useFela()
  const margin = useSpacing(props.spacing || 'NONE')
  const Component = props.as || 'p'

  return (
    <Component className={css(styles.notice, margin, props.extend)}>
      {props.icon && <Icon extend={styles.icon} icon={props.icon} />}{' '}
      {props.children}
    </Component>
  )
})
