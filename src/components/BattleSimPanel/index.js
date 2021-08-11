import React from 'react'
import { useFela } from 'react-fela'
import ButtonIcon from '../ButtonIcon'
import Title from '../Title'
import styles from './styles'

export default React.memo(function BattleSimPanel(props) {
  const { css } = useFela({ side: props.side })

  return (
    <div className={css(styles.panel)} data-testid={props['data-testid']}>
      <Title>{props.title}</Title>

      {props.children}

      {props.isMobile && props.isPanelOpen && (
        <ButtonIcon
          extend={styles.boardButton({ side: props.side })}
          onClick={props.closePanel}
          aria-label='Go to board'
          data-testid='panel-close-btn'
        >
          {props.side === 'left' ? '→' : '←'}
        </ButtonIcon>
      )}
    </div>
  )
})
