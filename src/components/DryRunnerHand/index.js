import React from 'react'
import DryRunnerCard from '~/components/DryRunnerCard'
import Row from '~/components/Row'
import chunk from '~/helpers/chunk'
import arrayPad from '~/helpers/arrayPad'

export default React.memo(function DryRunnerHand(props) {
  const hand = props.hand.slice(0)
  const paddedHand = arrayPad(hand, 4, null, +1)

  return (
    <Row data-testid='hand' isDesktopOnly spacing={{ bottom: 'LARGEST' }}>
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
