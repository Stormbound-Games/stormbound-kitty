import React from 'react'
import guides from '../../data/guides'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { UserContext } from '../UserProvider'
import { CATEGORIES } from '../../constants/guides'
import { STORY_CATEGORIES } from '../../constants/stories'

export default () => {
  const { isUnseen } = React.useContext(PersonalDecksContext)
  const { name } = React.useContext(UserContext)

  return [
    {
      id: 'HOME',
      icon: 'home',
      label: 'Home',
      items: [
        {
          title: 'Stormbound-Kitty',
          icon: 'cat',
          items: [
            { label: 'Kitty News', to: '/', id: 'NEWS' },
            { label: 'Frequently Asked Questions', to: '/faq', id: 'FAQ' },
            { label: 'About Kitty', to: '/about', id: 'ABOUT' },
          ],
        },
      ],
    },
    {
      id: 'GAME',
      icon: 'library',
      label: 'Official',
      items: [
        {
          title: 'Release Notes',
          icon: 'bullhorn',
          items: [
            {
              label: 'Update 08-2021',
              to: '/releases/08-2021',
              id: '08_2021',
              new: true,
            },
            {
              label: 'Update 07-2021',
              to: '/releases/07-2021',
              id: '07_2021',
            },
            {
              label: 'Update Brawl',
              to: '/releases/brawl-2021',
              id: 'brawl_2021',
            },
            {
              label: 'All Releases',
              to: '/releases',
              id: 'RELEASES',
            },
            {
              label: 'Card Changelog',
              to: '/changelog',
              id: 'CARD_CHANGELOG',
            },
          ],
        },
        {
          title: 'Information',
          icon: 'star',
          items: [
            {
              label: 'Fan-Kit',
              to: '/fan-kit',
              id: 'FAN_KIT',
            },
            { label: 'Known Bugs', to: '/guides/known-bugs', id: 'KNOWN_BUGS' },
            { label: 'Cards Statistics', to: '/card/stats', id: 'CARD_STATS' },
            { label: 'Lexicon', to: '/guides/lexicon', id: 'LEXICON' },
            {
              label: 'Soundtrack',
              href: 'https://www.tonyteoli.com/stormbound',
            },
          ],
        },
      ],
    },
    {
      id: 'GUIDES',
      icon: 'compass',
      label: 'Guides',
      items: Object.keys(CATEGORIES).map(category => {
        const catGuides = guides.filter(guide => guide.category === category)
        const shownGuides = catGuides.filter(guide => !guide.skipNav)
        const items = shownGuides.map(guide => ({
          label: guide.name,
          to: '/guides/' + guide.slug,
          id: guide.id,
        }))

        if (catGuides.length !== shownGuides.length) {
          items.push({
            label: `More ${CATEGORIES[category].name.short} guides`,
            to: '/guides/' + CATEGORIES[category].slug,
            id: category,
          })
        }

        return {
          title: CATEGORIES[category].name.long,
          icon: CATEGORIES[category].icon,
          to: '/guides/' + CATEGORIES[category].slug,
          items,
        }
      }),
    },
    {
      id: 'TOOLS',
      icon: 'hammer',
      label: 'Tools',
      new: isUnseen,
      items: [
        {
          title: 'Builders',
          icon: 'wand',
          items: [
            { label: 'Card Builder', to: '/card', id: 'CARD_BUILDER' },
            { label: 'Deck Builder', to: '/deck', id: 'DECK_BUILDER' },
            { label: 'List Builder', to: '/list', id: 'LIST_BUILDER' },
            { label: 'Quest Builder', to: '/quest', id: 'QUEST_BUILDER' },
            { label: 'Battle Sim', to: '/sim', id: 'BATTLE_SIM' },
            {
              label: 'Book Simulator',
              to: '/simulators/books',
              id: 'BOOK_SIMULATOR',
            },
          ],
        },
        {
          title: 'Calculators',
          icon: 'equalizer',
          items: [
            {
              label: 'Books Calculator',
              to: '/calculators/books',
              id: 'BOOKS_CALCULATOR',
            },
            {
              label: 'Brawl Calculator',
              to: '/calculators/brawl',
              id: 'BRAWL_CALCULATOR',
            },
            {
              label: 'Hero Calculator',
              to: '/calculators/hero',
              id: 'HERO_CALCULATOR',
            },
            {
              label: 'Income Calculator',
              to: '/calculators/income',
              id: 'INCOME_CALCULATOR',
            },
            {
              label: 'Value Calculator',
              to: '/calculators/value',
              id: 'VALUE_CALCULATOR',
            },
          ],
        },
        {
          title: 'Your Content',
          icon: 'user',
          items: [
            name && {
              label: 'Personal Feed',
              to: '/member/' + name,
              id: 'FEED',
            },
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
          ].filter(Boolean),
        },
      ],
    },
    {
      id: 'COMMUNITY',
      icon: 'users',
      label: 'Community',
      items: [
        {
          title: 'Meta',
          icon: 'stack',
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
            {
              label: 'Reckless Rush',
              to: '/deck/3xn1n2s1n3s24s2n67s6n24n15s8s11/detail',
              id: 'RECKLESS_RUSH',
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
              label: 'Weekly Card Contest',
              to: '/card/contest',
              id: 'CARD_CONTEST',
            },
            { label: 'Battle Puzzles', to: '/sim/puzzles', id: 'PUZZLES' },
            { label: 'Trivia Game', to: '/trivia', id: 'TRIVIA' },
          ],
        },
        {
          title: 'Discover',
          icon: 'star',
          items: [
            {
              label: 'Members',
              to: '/members',
              id: 'MEMBERS',
            },
            {
              label: 'Fan Art',
              to: '/fan-art',
              id: 'FAN_ART',
            },
            {
              label: 'Brewed Sages Podcast',
              to: '/brewed-sages',
              id: 'BREWED_SAGES',
            },
            {
              label: 'Videos',
              to: '/videos',
              id: 'VIDEOS',
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
          title: 'General',
          icon: 'folder-open',
          items: [
            {
              label: STORY_CATEGORIES.lore.title,
              to: '/stories/lore',
              id: 'lore',
            },
            {
              label: STORY_CATEGORIES.neutral.title,
              to: '/stories/neutral',
              id: 'neutral',
            },
            { label: 'All categories', to: '/stories', id: 'STORIES' },
          ],
        },
        {
          title: 'Factions',
          icon: 'sword',
          items: ['winter', 'ironclad', 'shadowfen', 'swarm'].map(category => ({
            label: STORY_CATEGORIES[category].title,
            to: '/stories/' + category,
            id: category,
          })),
        },
        {
          title: 'Sagas',
          icon: 'fire',
          items: [
            {
              label: STORY_CATEGORIES['eastern-heat'].title,
              to: `/stories/eastern-heat`,
              id: 'eastern-heat',
            },
            {
              label: STORY_CATEGORIES['march-of-fauns'].title,
              to: `/stories/march-of-fauns`,
              id: 'march-of-fauns',
            },
          ],
        },
      ],
    },
  ]
}
