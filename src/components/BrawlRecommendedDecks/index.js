import React from 'react'
import decks from '../../data/decks'
import chunk from '../../helpers/chunk'
import { BrawlContext } from '../BrawlProvider'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Row from '../Row'
import Title from '../Title'

export default React.memo(function BrawlRecommendedDecks(props) {
  const { id } = React.useContext(BrawlContext)
  const columns = props.columns || 2
  return (
    <>
      <Title>Recommended deck{props.limit === 1 ? '' : 's'}</Title>
      {chunk(
        decks
          .filter(deck => deck.brawl === id)
          .slice(0, props.limit || undefined),
        columns
      ).map((row, rowIndex) => (
        <Row desktopOnly key={rowIndex}>
          {Array.from({ length: columns }, (_, index) => (
            <Column
              key={index}
              width={columns > 2 ? `1/${columns}` : undefined}
            >
              {row[index] && <FeaturedDeck {...row[index]} showUpgrades />}
            </Column>
          ))}
        </Row>
      ))}
    </>
  )
})
