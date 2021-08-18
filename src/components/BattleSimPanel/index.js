import React from 'react'
import { useFela } from 'react-fela'
import DiamondButton from '~/components/DiamondButton'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function BattleSimPanel(props) {
  const { css } = useFela({ side: props.side })

  return (
    <div className={css(styles.panel)} data-testid={props['data-testid']}>
      <Title>{props.title}</Title>

      {props.children}

      {props.isMobile && props.isPanelOpen && (
        <DiamondButton
          extend={styles.boardButton({ side: props.side })}
          onClick={props.closePanel}
          label='Go to board'
          data-testid='panel-close-btn'
          isActive
          aria-pressed={false}
          icon={props.side === 'left' ? 'arrow-right' : 'arrow-left'}
        />
      )}
    </div>
  )
})
