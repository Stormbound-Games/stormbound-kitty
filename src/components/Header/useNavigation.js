import React from 'react'
import GUIDES from '../../data/guides'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { CATEGORIES } from '../../constants/guides'
import useFetch from '../../hooks/useFetch'
import { STORY_CATEGORIES } from '../../constants/stories'

export default () => {
  const { data: stories = [] } = useFetch('/stories.json')
  const { isUnseen } = React.useContext(PersonalDecksContext)

  return [
    {
      id: 'HOME',
      icon: 'home',
      label: 'Home',
      items: [
        {
          title: 'Stormbound-Kitty',
          icon: 'heart',
          items: [
            { label: 'News', to: '/', id: 'HOME' },
            { label: 'Donate', to: '/donate', id: 'DONATE' },
            { label: 'FAQ', to: '/faq', id: 'FAQ' },
          ],
        },
      ],
    },
    {
      id: 'GAME',
      icon: 'sword',
      label: 'Game',
      items: [
        {
          title: 'Changelog',
          icon: 'bullhorn',
          items: [
            {
              label: 'Third Anniversary',
              to: '/changelog/3rd-anniversary',
              id: '3RD_ANNIVERSARY',
              new: true,
            },
            {
              label: 'Update 09-2020',
              to: '/changelog/09-2020',
              id: '09_2020',
            },
            {
              label: 'Update 07-2020',
              to: '/changelog/07-2020',
              id: '07_2020',
            },
            {
              label: 'Release Notes',
              to: '/changelog/releases',
              id: 'RELEASE_NOTES',
            },
            {
              label: 'Card Changes',
              to: '/changelog/cards',
              id: 'CARD_CHANGES',
            },
          ],
        },
        {
          title: 'Meta',
          icon: 'star',
          items: [
            {
              label: 'Popular Decks',
              to: '/deck/suggestions',
              id: 'DECK_SUGGESTIONS',
            },
            {
              label: 'Equals Tier List',
              to: '/list/equals',
              id: 'EQUALS_LIST',
            },
            {
              label: 'Ranked Tier List',
              to: '/list/ranked',
              id: 'RANKED_LIST',
            },
            { label: 'Cards Statistics', to: '/card/stats', id: 'CARD_STATS' },
          ],
        },
        {
          title: 'Miscellaneous',
          icon: 'spades',
          items: [
            {
              label: 'Cards assets',
              to: '/fan-kit/cards',
              id: 'CARDS',
            },
            {
              label: 'Books assets',
              to: '/fan-kit/books',
              id: 'BOOKS',
            },
            {
              label: 'Wallpapers',
              to: '/fan-kit/wallpapers',
              id: 'WALLPAPERS',
            },
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
        icon: CATEGORIES[category].icon,
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
          icon: 'hammer',
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
          icon: 'user',
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
          icon: 'equalizer',
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
      icon: 'users',
      label: 'Community',
      items: [
        {
          title: 'Decks',
          icon: 'stack',
          items: [
            {
              label: 'Popular Decks',
              to: '/deck/suggestions',
              id: 'DECK_SUGGESTIONS',
            },
            {
              label: 'Reckless Rush',
              to: '/deck/3n13n23s13n33s243s23n633n673s63n153s83s11/detail',
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
          icon: 'trophy',
          items: [
            {
              label: 'Tournament Hall of Fame',
              to: '/tournaments/hall-of-fame',
              id: 'HALL_OF_FAME',
            },
            {
              label: 'Odd & Even Tournament',
              to: '/tournaments/odd-even',
              id: 'ODD_EVEN',
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
          title: 'Miscellaneous',
          icon: 'star',
          items: [
            {
              label: 'Brewed Sages Podcast',
              to: '/brewed-sages',
              id: 'BREWED_SAGES',
            },
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
          title: 'Categories',
          icon: 'folder-open',
          items: Object.keys(STORY_CATEGORIES)
            .filter(category => category !== 'eastern-heat')
            .map(category => ({
              label: STORY_CATEGORIES[category].title,
              to: '/stories/' + category,
              id: category,
            })),
        },
        {
          title: 'Eastern Heat',
          icon: 'fire',
          to: '/stories/eastern-heat',
          items: stories
            .filter(story => story.category === 'eastern-heat')
            .sort((a, b) => {
              const indexA = parseInt(a.title, 10)
              const indexB = parseInt(b.title, 10)

              return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
            })
            .slice(0, 5)
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
