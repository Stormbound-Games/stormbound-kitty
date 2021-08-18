import React from 'react'
import { useFela } from 'react-fela'
import Deck from '~/components/Deck'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'
import Only from '~/components/Only'
import serialisation from '~/helpers/serialisation'

export default React.memo(function FeedPodiumEntry(props) {
  const { css } = useFela()
  const { podium, decks, user } = props
  const isAtIndex = index =>
    podium[index]
      ? Array.isArray(podium[index])
        ? podium[index].map(u => u.toLowerCase()).includes(user)
        : podium[index].toLowerCase() === user
      : false
  const index = [0, 1, 2].map(isAtIndex).indexOf(true)
  const name = Array.isArray(podium[index])
    ? podium[index].find(u => u.toLowerCase() === user)
    : podium[index]
  const emoji = ['🥇', '🥈', '🥉'][index]
  const label = ['gold', 'silver', 'bronze'][index]
  const deck =
    decks && decks[index] && !decks[index].author ? decks[index].id : null
  return (
    <FeedEntry icon='trophy' date={props.date}>
      {name} has won
      {Array.isArray(props.podium[index]) ? (
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
          <summary>
            <Only.Desktop>Click</Only.Desktop>
            <Only.Mobile>Tap</Only.Mobile> to toggle deck display
          </summary>
          <Deck
            deck={serialisation.deck.deserialise(deck)}
            orientation='horizontal'
            id={deck}
          />
        </details>
      )}
    </FeedEntry>
  )
})
