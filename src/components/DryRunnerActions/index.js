import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import Row from '../Row'
import './index.css'

const DryRunnerActions = React.memo(function DryRunnerActions(props) {
  if (!props.activeCard) return null

  return (
    <div className='DryRunnerActions'>
      <Row>
        <Column>
          <CTA
            type='button'
            data-testid='cycle-btn'
            onClick={props.cycleCard}
            disabled={props.hasCycledThisTurn}
          >
            <u>C</u>ycle card
          </CTA>
        </Column>
        <Column style={{ alignItems: 'flex-end' }}>
          <CTA
            type='button'
            data-testid='play-btn'
            onClick={props.playCard}
            disabled={!props.canCardBePlayed(props.activeCard)}
          >
            <u>P</u>lay card
          </CTA>
        </Column>
      </Row>
    </div>
  )
})

export default DryRunnerActions
