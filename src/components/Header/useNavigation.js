import React from 'react'
import GUIDES from '../../data/guides'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { CATEGORIES } from '../../constants/guides'
import useFetch from '../../hooks/useFetch'
import shuffle from '../../helpers/shuffle'

export default () => {
  const { data: stories = [] } = useFetch('/stories.json')
  const { isUnseen } = React.useContext(PersonalDecksContext)

  return [
    {
      id: 'HOME',
      to: '/',
      icon: 'home',
      label: 'Home',
      items: [],
    },
    {
      id: 'GAME',
      icon: 'sword',
      label: 'Game',
      items: [
        {
          title: 'Changelog',
          to: '/changelog',
          items: [
            { label: 'Card Changes', to: '/changelog', id: 'CARD_CHANGES' },
            {
              label: 'July 2020 Update',
              to: '/changelog/07-2020',
              id: '07_2020',
            },
          ],
        },
        {
          title: 'Meta',
          items: [
            { label: 'Equals List', to: '/list/equals', id: 'EQUALS_LIST' },
            { label: 'Ranked List', to: '/list/ranked', id: 'RANKED_LIST' },
          ],
        },
        {
          title: 'Miscellaneous',
          items: [
            { label: 'Fan-Kit', to: '/fan-kit', id: 'FAN_KIT' },
            { label: 'Card Statistics', to: '/card/stats', id: 'CARD_STATS' },
            { label: 'Lexicon', to: '/guides/lexicon', id: 'LEXICON' },
          ],
        },
      ],
    },
    {
      id: 'GUIDES',
      icon: 'compass',
      label: 'Guides',
      items: Object.keys(CATEGORIES).map(category => ({
        title: CATEGORIES[category].name.long,
        to: '/guides/' + CATEGORIES[category].slug,
        items: GUIDES.filter(guide => guide.category === category).map(
          guide => ({
            label: guide.name,
            to: '/guides/' + guide.slug,
            id: guide.id,
          })
        ),
      })),
    },
    {
      id: 'TOOLS',
      icon: 'wand',
      label: 'Tools',
      new: isUnseen,
      items: [
        {
          title: 'Builders',
          items: [
            { label: 'Card Builder', to: '/card', id: 'CARD_BUILDER' },
            { label: 'Deck Builder', to: '/deck', id: 'DECK_BUILDER' },
            { label: 'List Builder', to: '/list', id: 'LIST_BUILDER' },
            { label: 'Quest Builder', to: '/quest', id: 'QUEST_BUILDER' },
            { label: 'Battle Sim', to: '/sim', id: 'BATTLE_SIM' },
          ],
        },
        {
          title: 'Your Content',
          items: [
            { label: 'Card Collection', to: '/collection', id: 'COLLECTION' },
            {
              label: 'Collection Stats',
              to: '/collection/stats',
              id: 'COLLECTION_STATS',
            },
            {
              label: 'Personal Decks',
              to: '/deck/collection',
              id: 'DECK_COLLECTION',
              new: isUnseen,
            },
            { label: 'Brawl Tracker', to: '/brawl', id: 'BRAWL' },
          ],
        },
        {
          title: 'Calculators',
          items: [
            {
              label: 'Income Calculator',
              to: '/income-calculator',
              id: 'INCOME_CALCULATOR',
            },
            {
              label: 'Books Calculator',
              to: '/collection/books',
              id: 'BOOKS_CALCULATOR',
            },
          ],
        },
      ],
    },
    {
      id: 'COMMUNITY',
      icon: 'star',
      label: 'Community',
      items: [
        {
          title: 'Decks',
          items: [
            {
              label: 'Popular Decks',
              to: '/deck/suggestions',
              id: 'DECK_SUGGESTIONS',
            },
            {
              label: 'Reckless Rush',
              to: '/deck/3n13n23s13n33s243s23n633n673s63n153s83s11',
              id: 'RECKLESS_RUSH',
            },
            {
              label: 'Brawl Decks',
              to: '/deck/suggestions?category=BRAWL',
              id: 'BRAWL_DECKS',
            },
          ],
        },
        {
          title: 'Contests',
          items: [
            {
              label: 'Tournament Hall of Fame',
              to: '/tournaments/hall-of-fame',
              id: 'HALL_OF_FAME',
            },
            {
              label: 'Weekly Card Contest',
              to: '/card/contest',
              id: 'CARD_CONTEST',
            },
            { label: 'Battle Puzzles', to: '/sim/puzzles', id: 'PUZZLES' },
          ],
        },
        {
          title: 'Kitty',
          items: [
            { label: 'Support & Donate', to: '/donate', id: 'DONATE' },
            { label: 'FAQ', to: '/faq', id: 'FAQ' },
          ],
        },
      ],
    },
    {
      id: 'STORIES',
      icon: 'quill',
      label: 'Stories',
      items: [
        {
          title: 'Lore Stories',
          to: '/stories/lore',
          items: stories
            .filter(story => story.category === 'lore')
            .map(story => ({
              label: story.title,
              to: '/stories/' + story.id,
              id: story.id,
            })),
        },
        {
          title: 'Neutral Stories',
          to: '/stories/neutral',
          items: shuffle(stories.filter(story => story.category === 'neutral'))
            .slice(0, 4)
            .map(story => ({
              label: story.title,
              to: '/stories/' + story.id,
              id: story.id,
            }))
            .concat({ label: 'More stories', to: '/stories' }),
        },
        {
          title: 'Eastern Heat',
          to: '/stories/eastern-heat',
          items: stories
            .filter(story => story.category === 'eastern-heat')
            .sort((a, b) => {
              const indexA = parseInt(a.title, 10)
              const indexB = parseInt(b.title, 10)

              return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
            })
            .slice(0, 4)
            .map(story => ({
              label: story.title,
              to: '/stories/' + story.id,
              id: story.id,
            }))
            .concat({
              label: 'Read all Eastern Heat',
              to: '/stories/eastern-heat',
            }),
        },
      ],
    },
  ]
}
