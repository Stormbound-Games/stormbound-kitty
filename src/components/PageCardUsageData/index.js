import React from 'react'
import Page from '#components/Page'
import Teasers from '#components/Teasers'
import { LEAGUES } from '#constants/game'
import capitalize from '#helpers/capitalize'

const IDs = ['N102', 'N59', 'N54', 'N47', 'N32', 'N28', 'N7', 'N3']
const ITEMS = [
  ...LEAGUES.reverse().map((league, index) => ({
    id: league,
    meta: 'Official content',
    cardId: IDs[index],
    title: 'Card usage in ' + capitalize(league),
    to: '/tier-list/' + league,
    color: `var(--${league}, var(--beige))`,
    excerpt: (
      <>
        A card list extracted from the game data ranking the most used cards in
        the <strong className='Highlight'>{capitalize(league)}</strong> league
        over the last 30 days.
      </>
    ),
  })),
  {
    meta: 'Community content',
    cardId: 'N38',
    title: 'Equals tier list',
    to: '/tier-list/equals',
    excerpt:
      'A tier list dedicated to the ‘Equals’ game mode, curated by the community on a semi-regular basis.',
  },
]

export default React.memo(function PageCardUsageData() {
  return (
    <Page
      title='Card Usage Data'
      description='Find the usage of cards across leagues (extracted from the game data) and game modes'
    >
      <Teasers items={ITEMS} />
    </Page>
  )
})
