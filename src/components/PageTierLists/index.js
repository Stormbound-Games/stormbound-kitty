import React from 'react'
import Page from '#components/Page'
import Teasers from '#components/Teasers'
import { LEAGUES } from '#constants/game'
import capitalize from '#helpers/capitalize'

const IDs = ['N59', 'N54', 'N47', 'N32', 'N28', 'N7', 'N3']
const ITEMS = [
  ...LEAGUES.reverse().map((league, index) => ({
    meta: 'Official content',
    cardId: IDs[index],
    title: capitalize(league) + ' Tier List',
    to: '/tier-list/' + league,
    color: `var(--${league}, var(--beige))`,
    excerpt: (
      <>
        A tier list based on the game data to list the most used card in the{' '}
        <strong className='Highlight'>{capitalize(league)}</strong> league over
        the last 30 days.
      </>
    ),
  })),
  {
    meta: 'Community content',
    cardId: 'N38',
    title: 'Equals Tier List',
    to: '/tier-list/equals',
    excerpt:
      'A tier list dedicated to the ‘Equals’ game mode, curated by the community on a semi-regular basis.',
  },
  {
    meta: 'Community content',
    cardId: 'N86',
    title: 'Ranked Tier List',
    to: '/tier-list/ranked',
    excerpt:
      'A tier list automatically computed based on the community decks to figure out which are the cards the most included.',
  },
]

export default React.memo(function PageFanKit() {
  return (
    <Page
      title='Tier Lists'
      description='Find all the tier lists, some curated by the community while others are extracted from the game data'
    >
      <Teasers items={ITEMS} />
    </Page>
  )
})
