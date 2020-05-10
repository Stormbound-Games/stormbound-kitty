import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Decks from '../Decks'
import MemberSection from '../MemberSection'
import sortDeckSuggestions from '../../helpers/sortDeckSuggestions'

export default React.memo(function MemberDecks(props) {
  const collectionContext = React.useContext(CollectionContext)
  const decks = props.decks.sort(sortDeckSuggestions(collectionContext))

  if (decks.length === 0) return null

  return (
    <MemberSection>
      <Decks decks={decks} columns={3} showUpgrades />
    </MemberSection>
  )
})
