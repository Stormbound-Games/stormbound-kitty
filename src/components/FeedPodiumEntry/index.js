import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Deck from '~/components/Deck'
import FeedDetailDisplay from '~/components/FeedDetailDisplay'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'
import serialization from '~/helpers/serialization'

export default React.memo(function FeedPodiumEntry(props) {
  const { cardsIndexBySid } = React.useContext(CardsContext)
  const { podium, decks, user } = props
  const isAtIndex = index =>
    podium[index]?.map(user => user.slug)?.includes(user.slug) ?? false
  const index = [0, 1, 2].map(isAtIndex).indexOf(true)
  const emoji = ['🥇', '🥈', '🥉'][index]
  const label = ['gold', 'silver', 'bronze'][index]
  const deck =
    decks && decks[index] && !decks[index].author ? decks[index].id : null

  return (
    <FeedEntry icon='trophy' date={props.date}>
      {user.name} has won
      {props.podium[index].length > 1 ? (
        <>
          , alongside{' '}
          <MemberList
            members={props.podium[index].filter(
              winner => winner.slug !== user.slug
            )}
          />
          ,
        </>
      ) : null}{' '}
      the{' '}
      <span className='Highlight'>
        {emoji} {label} medal
      </span>{' '}
      in {props.name}.
      {deck && (
        <FeedDetailDisplay label='deck'>
          <Deck
            deck={serialization.deck.deserialize(cardsIndexBySid, deck)}
            orientation='horizontal'
            id={deck}
          />
        </FeedDetailDisplay>
      )}
    </FeedEntry>
  )
})
