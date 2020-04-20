import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Row from '../Row'
import Column from '../Column'
import Suggestion from '../DeckBuilderSuggestion'
import MemberSection from '../MemberSection'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'
import chunk from '../../helpers/chunk'

const MemberDecks = props => {
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
          <Row desktopOnly>
            <Column width={33}>{slot1 && <Suggestion {...slot1} />}</Column>
            <Column width={33}>{slot2 && <Suggestion {...slot2} />}</Column>
            <Column width={33}>{slot3 && <Suggestion {...slot3} />}</Column>
          </Row>
        )
      })}
    </MemberSection>
  )
}

export default MemberDecks
