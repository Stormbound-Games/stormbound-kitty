import React from 'react'
import guides from '../../data/guides'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { UserContext } from '../UserProvider'
import { CATEGORIES } from '../../constants/guides'
import { STORY_CATEGORIES } from '../../constants/stories'
import { StoriesContext } from '../StoriesProvider'

export default () => {
  const stories = React.useContext(StoriesContext)
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
            { label: 'Kitty News', to: '/', id: 'HOME' },
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
          title: 'Updates',
          icon: 'bullhorn',
          items: [
            {
              label: 'Update 07-2021',
              to: '/releases/07-2021',
              id: '07_2021',
              new: true,
            },
            {
              label: 'Brawl update',
              to: '/releases/brawl-2021',
              id: 'brawl_2021',
            },
            {
              label: 'Update 06-2021',
              to: '/releases/06-2021',
              id: '06_2021',
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
          title: 'Fan-Kit',
          icon: 'image',
          items: [
            {
              label: 'Card Images',
              to: '/fan-kit/cards',
              id: 'CARDS',
            },
            {
              label: 'Book Images',
              to: '/fan-kit/books',
              id: 'BOOKS',
            },
            {
              label: 'Avatar Images',
              to: '/fan-kit/avatars',
              id: 'AVATARS',
            },
            {
              label: 'Wallpapers',
              to: '/fan-kit/wallpapers',
              id: 'WALLPAPERS',
            },
            {
              label: 'Backgrounds',
              to: '/fan-kit/backgrounds',
              id: 'BACKGROUNDS',
            },
          ],
        },
        {
          title: 'Miscellaneous',
          icon: 'star',
          items: [
            { label: 'Known Bugs', to: '/guides/known-bugs', id: 'KNOWN_BUGS' },
            { label: 'Stormbound Trivia', to: '/trivia', id: 'TRIVIA' },
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
              new: true,
            },
          ],
        },
        {
          title: 'Your Content',
          icon: 'user',
          items: [
            name && {
              label: 'Personal feed',
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
          ],
        },
        {
          title: 'Miscellaneous',
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
          title: 'Categories',
          icon: 'folder-open',
          items: Object.keys(STORY_CATEGORIES)
            .filter(
              category => !['eastern-heat', 'march-of-fauns'].includes(category)
            )
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
        {
          title: 'March of Fauns',
          icon: 'drop',
          to: '/stories/march-of-fauns',
          items: stories
            .filter(story => story.category === 'march-of-fauns')
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
              label: 'Read all of March of Fauns',
              to: '/stories/march-of-fauns',
            }),
        },
      ],
    },
  ]
}
