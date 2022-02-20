import React from 'react'
import FeaturedDeck from '~/components/FeaturedDeck'
import MemberList from '~/components/MemberList'
import parseDate from '~/helpers/parseDate'
import toSentence from '~/helpers/toSentence'

const toArray = value => (Array.isArray(value) ? value : [value])

const getDeckAuthor = (podium, decks, index) => {
  const deck = decks[index]

  if (typeof deck.author === 'string') {
    return deck.author
  }

  if (Array.isArray(deck.authors)) {
    return <MemberList members={deck.authors} />
  }

  if (typeof podium[index] === 'string') {
    return podium[index]
  }

  if (Array.isArray(podium[index])) {
    if (podium[index].length === 1) return podium[index]
    return <MemberList members={podium[index]} />
  }

  return 'unknown author'
}

const getDeckName = (podium, decks, index) => {
  const deck = decks[index]
  const author = getDeckAuthor(podium, decks, index)
  const withS = author => !/[xzs]$/.test(author)

  if (typeof deck.name === 'string') {
    return deck.name
  }

  if (typeof author === 'string') {
    return `${author}’${withS(author) ? 's' : ''} deck`
  }

  const authors = deck.authors || podium[index]

  return (
    toSentence(
      authors.map(author => author + (withS(author) ? '’s' : '’')),
      'and'
    ) + ' deck'
  )
}

export default React.memo(function TournamentDeck(props) {
  const [index, setIndex] = React.useState(0)
  const { decks, podium } = props
  const winner = podium[0]

  if (!props.decks) {
    return (
      <p>
        The winner’s deck is not available. If you happen to know which deck{' '}
        <MemberList members={toArray(winner)} />{' '}
        {Array.isArray(winner) ? 'were' : 'was'} playing, please contact me on
        Discord.
      </p>
    )
  }

  return (
    <>
      <FeaturedDeck
        id={decks[index].id}
        name={getDeckName(podium, decks, index)}
        author={getDeckAuthor(podium, decks, index)}
        tags={['EQUALS']}
        nerfed={parseDate(props.date) < new Date(2019, 6, 1) ? '07/2020' : null}
        noAuthorLink
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
