import React from 'react'
import ButtonIcon from '../ButtonIcon'
import Title from '../Title'
import './index.css'

const BSPanel = props => {
  return (
    <div
      className={`BSPanel BSPanel--${props.side}`}
      data-testid={props['data-testid']}
    >
      <Title>{props.title}</Title>

      {props.children}

      {props.isMobile && props.isPanelOpen && (
        <ButtonIcon
          className='BSPanel__board-button'
          onClick={props.closePanel}
          aria-label='Go to board'
          data-testid='panel-close-btn'
        >
          {props.side === 'left' ? '→' : '←'}
        </ButtonIcon>
      )}
    </div>
  )
}

export default BSPanel
