import React from 'react'
import FeaturedDeck from '~/components/FeaturedDeck'
import MemberList from '~/components/MemberList'
import parseDate from '~/helpers/parseDate'

export default React.memo(function TournamentDeck(props) {
  const [index, setIndex] = React.useState(0)
  const { decks, podium } = props
  const winner = podium[0]

  if (!decks.length) {
    return (
      <p>
        The winner’s deck is not available. If you happen to know which deck{' '}
        <MemberList members={winner} /> {Array.isArray(winner) ? 'were' : 'was'}{' '}
        playing, please contact me on Discord.
      </p>
    )
  }

  const deck = decks[index]

  return (
    <>
      <FeaturedDeck
        id={deck.id}
        name={deck.name || 'Unnamed deck'}
        author={podium[index]}
        tags={[{ name: 'Equals', slug: 'EQUALS' }]}
        nerfed={parseDate(props.date) < new Date(2019, 6, 1) ? '07/2020' : null}
        actions={[
          index > 0 && {
            icon: 'arrow-left',
            label: 'Go to next deck',
            onClick: () => setIndex(index - 1),
          },
          index < decks.length - 1 && {
            icon: 'arrow-right',
            label: 'Go to previous deck',
            onClick: () => setIndex(index + 1),
          },
        ].filter(Boolean)}
      />
    </>
  )
})
