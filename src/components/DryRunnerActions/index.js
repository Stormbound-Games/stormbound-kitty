import React from 'react'
import { useFela } from 'react-fela'
import CTA from '../CTA'
import Row from '../Row'

export default React.memo(function DryRunnerActions(props) {
  const { css } = useFela()

  if (!props.activeCard) return null

  return (
    <div className={css({ marginTop: '3em' })}>
      <Row desktopOnly>
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
    </div>
  )
})
