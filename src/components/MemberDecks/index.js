import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Row from '../Row'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import MemberSection from '../MemberSection'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'
import chunk from '../../helpers/chunk'

export default React.memo(function MemberDecks(props) {
  const collectionContext = React.useContext(CollectionContext)
  const decks = props.decks.sort(sortDeckSuggestions(collectionContext))

  if (decks.length === 0) return null

  return (
    <MemberSection title={<>Decks by {props.displayName}</>}>
      {chunk(decks, 3).map(([a, b, c]) => {
        const slot1 = b || c ? a : null
        const slot2 = !(b || c) ? a : b
        const slot3 = c

        return (
          <Row desktopOnly key={a.id}>
            <Column width='1/3'>{slot1 && <FeaturedDeck {...slot1} />}</Column>
            <Column width='1/3'>{slot2 && <FeaturedDeck {...slot2} />}</Column>
            <Column width='1/3'>{slot3 && <FeaturedDeck {...slot3} />}</Column>
          </Row>
        )
      })}
    </MemberSection>
  )
})
