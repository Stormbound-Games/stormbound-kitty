import { STORY_CATEGORIES } from '#constants/stories'

const getNavigation = releases => [
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
          { label: 'Contribute', to: '/contribute', id: 'CONTRIBUTE' },
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
          ...releases.map((release, index) => ({
            label: release.title,
            to: '/releases/' + release.slug,
            id: release.id,
            isNew: index === 0,
          })),
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
        id: 'RULES',
        title: 'Rules',
        icon: 'library',
        items: [
          {
            label: 'Rulebook',
            to: '/rulebook',
            id: 'RULEBOOK',
          },
          {
            label: 'Draft Mode',
            to: '/draft-mode',
            id: 'DRAFT_MODE',
          },
          {
            label: 'Brawl Mode',
            to: '/brawl-mode',
            id: 'BRAWL_MODE',
          },
          {
            label: 'Drawing Mechanics',
            to: '/drawing-mechanics',
            id: 'DRAWING_MECHANICS',
          },
          { label: 'Lexicon', to: '/lexicon', id: 'LEXICON' },
        ],
      },
      {
        id: 'INFORMATION',
        title: 'Information',
        icon: 'star',
        items: [
          {
            label: 'Community Programs',
            to: '/community-programs',
            id: 'COMMUNITY_PROGRAMS',
          },
          {
            label: 'Fan-Kit',
            to: '/fan-kit',
            id: 'FAN_KIT',
          },
          { label: 'Cards Index', to: '/cards/N89', id: 'CARDS' },
          {
            label: 'Card usage data',
            to: '/card-usage',
            id: 'CARD_USAGE',
          },
          { label: 'Statistics', to: '/stats', id: 'STATISTICS' },
        ],
      },
    ],
  },
  {
    id: 'GUIDES',
    icon: 'compass',
    label: 'Guides',
    items: [
      {
        id: 'ESSENTIALS',
        title: 'Essential Guides',
        icon: 'shield',
        to: '/guides/essentials',
        items: [
          { label: 'Battle Guide', to: '/guides/battle', id: 'BATTLE' },
          {
            label: 'Intro to Equals',
            to: '/guides/equals',
            id: 'INTRO_TO_EQUALS',
          },
          { label: 'Deck Building', to: '/guides/deck', id: 'DECK_BUILDING' },
          {
            label: 'About Structures',
            to: '/guides/structures',
            id: 'STRUCTURES',
          },
        ],
      },
      {
        id: 'PLAYSTYLE',
        title: 'Playstyle Guides',
        icon: 'power',
        to: '/guides/playstyle',
        items: [
          {
            label: 'Reckless Rush',
            to: '/guides/reckless-rush',
            id: 'RECKLESS_RUSH',
          },
          {
            label: 'Mia’s Metropolis',
            to: '/guides/mias-metropolis',
            id: 'MIAS_METROPOLIS',
          },
          {
            label: 'Green Prototypes',
            to: '/guides/green-prototypes',
            id: 'GREEN_PROTOTYPES',
          },
          {
            label: 'More playstyle guides',
            to: '/guides/playstyle',
            id: 'PLAYSTYLE',
          },
        ],
      },
      {
        id: 'IN_DEPTH',
        title: 'In-depth Guides',
        icon: 'target',
        to: '/guides/in-depth',
        items: [
          { label: 'About Triggers', to: '/guides/triggers', id: 'TRIGGERS' },
          {
            label: 'Mana Curve Analysis',
            to: '/guides/mana-curve',
            id: 'MANA_CURVE',
          },
          {
            label: 'Tempo & Value',
            to: '/guides/tempo-and-value',
            id: 'ESSENTIALS',
          },
          { label: 'Stormbound Trivia', to: '/guides/trivia', id: 'TRIVIA' },
        ],
      },
    ],
  },
  {
    id: 'TOOLS',
    icon: 'hammer',
    label: 'Tools',
    items: [
      {
        id: 'BUILDERS',
        title: 'Builders',
        icon: 'hammer',
        items: [
          { label: 'Card Builder', to: '/card', id: 'CARD_BUILDER' },
          { label: 'Deck Builder', to: '/deck', id: 'DECK_BUILDER' },
          { label: 'List Builder', to: '/list', id: 'LIST_BUILDER' },
          { label: 'Quest Builder', to: '/quest', id: 'QUEST_BUILDER' },
        ],
      },
      {
        id: 'SIMULATORS',
        title: 'Simulators',
        icon: 'wand',
        items: [
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
          {
            label: 'Draft Simulator',
            to: '/simulators/draft',
            id: 'DRAFT_SIMULATOR',
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
            label: 'Bookmarked Decks',
            to: '/decks/bookmarks',
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
            to: '/decks',
            id: 'FEATURED_DECKS',
          },
          {
            label: 'Equals Tier List',
            to: '/tier-list/equals',
            id: 'EQUALS_LIST',
          },
          {
            label: 'Draft Tier List',
            href: 'https://docs.google.com/spreadsheets/d/1hzDmUxjgvzB_WFQhaKWrpUmCm4Zc-2TqGfWdIJzJrkQ/edit',
            id: 'DRAFT_LIST',
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
            to: '/swcc',
            id: 'CARD_CONTEST',
          },
          {
            label: 'Battle Puzzles',
            to: '/puzzles',
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
            label: 'YouTube Channels',
            to: '/videos',
            id: 'YOUTUBE_CHANNELS',
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
            to: '/stories/eastern-heat',
            id: 'eastern-heat',
          },
          {
            label: STORY_CATEGORIES['march-of-fauns'].title,
            to: '/stories/march-of-fauns',
            id: 'march-of-fauns',
          },
          {
            label: STORY_CATEGORIES['the-second-storm'].title,
            to: '/stories/the-second-storm',
            id: 'the-second-storm',
          },
        ],
      },
    ],
  },
]

export default getNavigation
