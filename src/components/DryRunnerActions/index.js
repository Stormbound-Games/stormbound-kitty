import React from 'react'
import CTA from '~/components/CTA'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'

export default React.memo(function DryRunnerActions(props) {
  if (!props.activeCard) return null

  return (
    <Spacing top='LARGER'>
      <Row isDesktopOnly>
        <Row.Column align='center'>
          <CTA
            type='button'
            data-testid='cycle-btn'
            onClick={props.cycleCard}
            disabled={props.hasCycledThisTurn}
          >
            <u>C</u>ycle card
          </CTA>
        </Row.Column>
        <Row.Column align='center'>
          <CTA
            type='button'
            data-testid='play-btn'
            onClick={props.playCard}
            disabled={
              props.activeCard && !props.canCardBePlayed(props.activeCard)
            }
          >
            <u>P</u>lay card
          </CTA>
        </Row.Column>
      </Row>
    </Spacing>
  )
})
