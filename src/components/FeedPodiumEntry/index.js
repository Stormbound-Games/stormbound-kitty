import React from 'react'
import { useFela } from 'react-fela'
import Deck from '~/components/Deck'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'
import serialization from '~/helpers/serialization'

export default React.memo(function FeedPodiumEntry(props) {
  const { css } = useFela()
  const { podium, decks, user } = props
  const isAtIndex = index =>
    podium[index]?.map(u => u.toLowerCase()).includes(user) ?? false
  const index = [0, 1, 2].map(isAtIndex).indexOf(true)
  const name = podium[index].find(u => u.toLowerCase() === user)
  const emoji = ['🥇', '🥈', '🥉'][index]
  const label = ['gold', 'silver', 'bronze'][index]
  const deck =
    decks && decks[index] && !decks[index].author ? decks[index].id : null
  return (
    <FeedEntry icon='trophy' date={props.date}>
      {name} has won
      {props.podium[index].length > 1 ? (
        <>
          , alongside{' '}
          <MemberList
            members={props.podium[index].filter(winner => winner !== name)}
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
        <details open className={css({ maxWidth: '450px' })}>
          <summary className={css({ marginBottom: 'var(--s-base)' })}>
            + Toggle deck display
          </summary>
          <Deck
            deck={serialization.deck.deserialize(deck)}
            orientation='horizontal'
            id={deck}
          />
        </details>
      )}
    </FeedEntry>
  )
})
