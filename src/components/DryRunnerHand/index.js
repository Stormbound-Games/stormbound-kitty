import React from 'react'
import DryRunnerCard from '../DryRunnerCard'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

export default React.memo(function DryRunnerHand(props) {
  const hand = props.hand.slice(0)
  const paddedHand = arrayPad(hand, 4, null, +1)

  return (
    <Row data-testid='hand' desktopOnly>
      {chunk(paddedHand, 2).map(([cardA, cardB], index) => (
        <Row.Column key={cardA ? cardA.id + '_' + cardA.idx : index}>
          <Row>
            <Row.Column>
              <DryRunnerCard {...props} card={cardA} />
            </Row.Column>
            <Row.Column>
              <DryRunnerCard {...props} card={cardB} />
            </Row.Column>
          </Row>
        </Row.Column>
      ))}
    </Row>
  )
})
