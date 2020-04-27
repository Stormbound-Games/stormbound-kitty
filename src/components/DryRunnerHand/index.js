import React from 'react'
import Column from '../Column'
import DryRunnerCard from '../DryRunnerCard'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

const DryRunnerHand = React.memo(function DryRunnerHand(props) {
  const hand = props.hand.slice(0)
  const paddedHand = arrayPad(hand, 4, null, +1)

  return (
    <Row data-testid='hand' desktopOnly>
      {chunk(paddedHand, 2).map(([cardA, cardB], index) => (
        <Column key={cardA || index}>
          <Row>
            <Column>
              <DryRunnerCard {...props} card={cardA} />
            </Column>
            <Column>
              <DryRunnerCard {...props} card={cardB} />
            </Column>
          </Row>
        </Column>
      ))}
    </Row>
  )
})

export default DryRunnerHand
