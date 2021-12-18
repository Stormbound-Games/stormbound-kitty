import GUIDES from '~/data/guides'
import { CATEGORIES } from '~/constants/guides'
import { STORY_CATEGORIES } from '~/constants/stories'

const getNavigation = () => {
  return [
    {
      id: 'HOME',
      icon: 'home',
      label: 'Home',
      items: [
        {
          id: 'HOME',
          title: 'About the site',
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
          id: 'UPDATES',
          title: 'Release Notes',
          icon: 'bullhorn',
          items: [
            {
              label: 'Update 01-2022',
              to: '/releases/01-2022',
              id: '2022_01',
              isNew: true,
            },
            {
              label: 'Update 12-2021',
              to: '/releases/12-2021',
              id: '2021_12',
            },
            {
              label: 'Update 11-2021',
              to: '/releases/11-2021',
              id: '2021_11',
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
          id: 'INFORMATION',
          title: 'Information',
          icon: 'star',
          items: [
            {
              label: 'Fan-Kit',
              to: '/fan-kit',
              id: 'FAN_KIT',
            },
            { label: 'Known Bugs', to: '/known-bugs', id: 'KNOWN_BUGS' },
            { label: 'Cards Statistics', to: '/card/stats', id: 'CARD_STATS' },
            { label: 'Lexicon', to: '/lexicon', id: 'LEXICON' },
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
        const catGuides = GUIDES.filter(guide => guide.category === category)
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
          id: category,
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
      items: [
        {
          id: 'BUILDERS',
          title: 'Builders',
          icon: 'wand',
          items: [
            { label: 'Card Builder', to: '/card', id: 'CARD_BUILDER' },
            { label: 'Deck Builder', to: '/deck', id: 'DECK_BUILDER' },
            { label: 'List Builder', to: '/list', id: 'LIST_BUILDER' },
            { label: 'Quest Builder', to: '/quest', id: 'QUEST_BUILDER' },
            {
              label: 'Battle Simulator',
              to: '/simulators/battle',
              id: 'BATTLE_SIM',
            },
            {
              label: 'Book Simulator',
              to: '/simulators/books',
              id: 'BOOK_SIMULATOR',
            },
          ],
        },
        {
          id: 'CALCULATORS',
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
      id: 'YOUR_CONTENT',
      icon: 'user',
      label: 'Your Content',
      items: [
        {
          id: 'YOUR_CONTENT',
          title: 'About you',
          icon: 'user',
          items: [
            {
              label: 'Card Collection',
              to: '/collection',
              id: 'COLLECTION',
            },
            {
              label: 'Collection Stats',
              to: '/collection/stats',
              id: 'COLLECTION_STATS',
            },
            {
              label: 'Personal Decks',
              to: '/deck/collection',
              id: 'DECK_COLLECTION',
            },
            { label: 'Brawl Tracker', to: '/brawl', id: 'BRAWL_TRACKER' },
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
          id: 'META',
          title: 'Meta',
          icon: 'stack',
          items: [
            {
              label: 'Featured Decks',
              to: '/deck/featured',
              id: 'FEATURED_DECKS',
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
          id: 'CONTESTS',
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
            {
              label: 'Battle Puzzles',
              to: '/simulators/battle/puzzles',
              id: 'PUZZLES',
            },
            { label: 'Trivia Game', to: '/trivia', id: 'TRIVIA' },
          ],
        },
        {
          id: 'DISCOVER',
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
          id: 'GENERAL',
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
          id: 'SAGAS',
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

export default getNavigation
