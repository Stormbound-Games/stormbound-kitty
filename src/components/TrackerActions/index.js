import React from 'react'
import CTA from '../CTA'
import Row from '../Row'
import { STATUSES } from '../../constants/tracker'

export default React.memo(function TrackerActions(props) {
  if (!props.activeCard) return null

  return (
    <div className='TrackerActions'>
      <Row desktopOnly>
        <Row.Column align='center'>
          <CTA
            type='button'
            onClick={props.cycleCard}
            disabled={
              props.status !== STATUSES.PLAYING ||
              !props.activeCard ||
              !!props.cycledCard
            }
          >
            <u>C</u>ycle card
          </CTA>
        </Row.Column>
        <Row.Column align='center'>
          <CTA
            type='button'
            onClick={props.playCard}
            disabled={
              props.status !== STATUSES.PLAYING ||
              !props.activeCard ||
              !props.canCardBePlayed(props.state, props.activeCard)
            }
          >
            <u>P</u>lay card
          </CTA>
        </Row.Column>
      </Row>
    </div>
  )
})
