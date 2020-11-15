import React from 'react'
import Row from '../Row'
import TrackerCard from '../TrackerCard'
import arrayPad from '../../helpers/arrayPad'
import chunk from '../../helpers/chunk'

export default React.memo(function TrackerHand(props) {
  const hand = props.hand.slice(0)
  const paddedHand = arrayPad(hand, 4, null, +1)

  return (
    <Row data-testid='hand' desktopOnly>
      {chunk(paddedHand, 2).map(([cardA, cardB], index) => (
        <Row.Column key={cardA || index}>
          <Row>
            <Row.Column>
              <TrackerCard {...props} card={cardA} />
            </Row.Column>
            <Row.Column>
              <TrackerCard {...props} card={cardB} />
            </Row.Column>
          </Row>
        </Row.Column>
      ))}
    </Row>
  )
})
