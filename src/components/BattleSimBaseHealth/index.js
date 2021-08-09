import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function BattleSimBaseHealth(props) {
  const { css } = useFela()

  return (
    <div className={css(styles.container)}>
      <span
        className={css(styles.value)}
        data-testid={`${props.player}-health`}
      >
        {props.health}
      </span>
    </div>
  )
})
