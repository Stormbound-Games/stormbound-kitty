import React from 'react'
import FeaturedDeck from '../FeaturedDeck'
import toSentence from '../../helpers/toSentence'
import { getDate } from '../TournamentHallOfFame'

const toArray = value => (Array.isArray(value) ? value : [value])

export default React.memo(function TournamentDeck(props) {
  const [index, setIndex] = React.useState(0)
  const decks = Array.isArray(props.deck) ? props.deck : [props.deck]
  const winner = props.podium[0]
  const winners = toSentence(toArray(winner), 'and')

  if (!props.deck) {
    return (
      <p>
        The winner’s deck is not available. If you happen to know which deck{' '}
        {winners} {Array.isArray(winner) ? 'were' : 'was'} playing, please
        contact me on Discord.
      </p>
    )
  }

  return (
    <>
      <FeaturedDeck
        id={decks[index]}
        name={['1st Deck', '2nd Deck', '3rd Deck'][index]}
        author={toSentence(toArray(props.podium[index]), 'and')}
        category='EQUALS'
        nerfed={getDate(props.date) < new Date(2019, 6, 1) ? '07.2020' : null}
        noAuthorLink
        actions={[
          index > 0 && {
            icon: 'arrow-left',
            'aria-label': 'Go to next deck',
            onClick: () => setIndex(index - 1),
          },
          index < decks.length - 1 && {
            icon: 'arrow-right',
            'aria-label': 'Go to previous deck',
            onClick: () => setIndex(index + 1),
          },
        ].filter(Boolean)}
      />
    </>
  )
})
