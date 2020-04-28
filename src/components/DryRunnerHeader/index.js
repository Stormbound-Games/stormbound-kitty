import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import DryRunnerResetDialog from '../DryRunnerResetDialog'
import Mana from '../Mana'
import Row from '../Row'
import './index.css'

export default React.memo(function DryRunnerHeader(props) {
  return (
    <div className='DryRunnerHeader'>
      <Row desktopOnly>
        <Column width='1/3' style={{ alignItems: 'center' }}>
          <span className='DryRunnerHeader__mana'>
            Current mana:{' '}
            <Mana
              mana={props.mana}
              data-testid='mana-pool'
              disabled={props.hand.every(
                cardId => !props.canCardBePlayed(cardId)
              )}
              pulse={props.pulse}
            />
          </span>
        </Column>

        <Column width='1/3' style={{ alignItems: 'center' }}>
          <DryRunnerResetDialog
            reset={props.resetGame}
            equalsMode={props.equalsMode}
            setEqualsMode={props.setEqualsMode}
          />
        </Column>

        <Column width='1/3' style={{ alignItems: 'center' }}>
          <CTA type='button' data-testid='end-turn-btn' onClick={props.endTurn}>
            <u>E</u>nd turn
          </CTA>
        </Column>
      </Row>
    </div>
  )
})
