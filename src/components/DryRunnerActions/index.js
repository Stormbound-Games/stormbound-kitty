import React from 'react'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'

export default React.memo(function DryRunnerActions(props) {
  if (!props.activeCard) return null

  return (
    <Spacing top='LARGER'>
      <Row withNarrowGutter>
        <Row.Column align='center'>
          <CTA
            type='button'
            data-testid='cycle-btn'
            onClick={props.cycleCard}
            disabled={props.hasCycledThisTurn}
            isFullWidthOnMobile
          >
            <Only.Desktop>
              <u>C</u>ycle card
            </Only.Desktop>
            <Only.Mobile>Cycle</Only.Mobile>
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
            isFullWidthOnMobile
          >
            <Only.Desktop>
              <u>P</u>lay card
            </Only.Desktop>
            <Only.Mobile>Play</Only.Mobile>
          </CTA>
        </Row.Column>
      </Row>
    </Spacing>
  )
})
