import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import DryRunnerResetDialog from '../DryRunnerResetDialog'
import Mana from '../Mana'
import Row from '../Row'
import './index.css'

const DryRunnerHeader = props => (
  <div className='DryRunnerHeader'>
    <Row>
      <Column width={33}>
        <span className='DryRunnerHeader__mana'>
          Current mana:{' '}
          <Mana
            mana={props.mana}
            data-testid='mana-pool'
            disabled={props.hand.every(
              cardId => !props.canCardBePlayed(cardId)
            )}
          />
        </span>
      </Column>

      <Column width={33}>
        <DryRunnerResetDialog
          reset={props.resetGame}
          equalsMode={props.equalsMode}
          setEqualsMode={props.setEqualsMode}
        />
      </Column>

      <Column width={33}>
        <CTA type='button' data-testid='end-turn-btn' onClick={props.endTurn}>
          <u>E</u>nd turn
        </CTA>
      </Column>
    </Row>
  </div>
)

export default DryRunnerHeader
