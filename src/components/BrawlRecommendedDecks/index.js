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

  return (
    <>
      <Title>Recommended decks</Title>
      {chunk(
        decks.filter(deck => deck.brawl === id),
        2
      ).map(([a, b]) => (
        <Row desktopOnly key={a.id}>
          <Column>
            <FeaturedDeck {...a} showUpgrades />
          </Column>
          <Column>{b ? <FeaturedDeck {...b} showUpgrades /> : null}</Column>
        </Row>
      ))}
    </>
  )
})
