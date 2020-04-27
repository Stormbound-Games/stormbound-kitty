import React from 'react'
import Column from '../Column'
import Row from '../Row'
import TrackerCard from '../TrackerCard'
import arrayPad from '../../helpers/arrayPad'
import chunk from '../../helpers/chunk'

const TrackerHand = React.memo(props => {
  const hand = props.hand.slice(0)
  const paddedHand = arrayPad(hand, 4, null, +1)

  return (
    <Row data-testid='hand' desktopOnly>
      {chunk(paddedHand, 2).map(([cardA, cardB], index) => (
        <Column key={cardA || index}>
          <Row>
            <Column>
              <TrackerCard {...props} card={cardA} />
            </Column>
            <Column>
              <TrackerCard {...props} card={cardB} />
            </Column>
          </Row>
        </Column>
      ))}
    </Row>
  )
})

export default TrackerHand
