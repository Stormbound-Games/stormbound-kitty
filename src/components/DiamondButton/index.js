import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import styles from './styles'

export default React.memo(function DiamondButton(props) {
  const { css } = useFela({ isActive: !!props.active })

  return (
    <button
      {...props}
      active={undefined}
      data-active={!!props.active || undefined}
      className={css(styles.button, props.extend)}
    >
      <Icon icon={props.icon} />
    </button>
  )
})
