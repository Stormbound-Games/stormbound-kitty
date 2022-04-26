import { STORY_CATEGORIES } from '~/constants/stories'
import getReleases from '~/api/releases/getReleases'

const getNavigation = async ({ isPreview }) => {
  const releases = await getReleases({ isPreview, limit: 3 })

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
            { label: 'Cards Index', to: '/cards/N89', id: 'CARDS' },
            { label: 'Statistics', to: '/stats', id: 'STATISTICS' },
            { label: 'Lexicon', to: '/lexicon', id: 'LEXICON' },
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
              label: 'Drawing Mechanics',
              to: '/drawing-mechanics',
              id: 'DRAWING_MECHANICS',
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
            {
              label: 'Beginner’s Guide',
              to: '/guides/beginner',
              id: 'BEGINNER',
            },
            { label: 'Complete Guide', to: '/guides/complete', id: 'COMPLETE' },
            {
              label: 'Intro to Equals',
              to: '/guides/equals',
              id: 'INTRO_TO_EQUALS',
            },
            { label: 'Deck Building', to: '/guides/deck', id: 'DECK_BUILDING' },
            {
              label: 'More essential guides',
              to: '/guides/essentials',
              id: 'ESSENTIALS',
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
              label: 'Faithless Prophets',
              to: '/guides/faithless-prophets',
              id: 'FAITHLESS_PROPHETS',
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
          id: 'BRAWL_MODE',
          title: 'Brawl Guides',
          icon: 'crown',
          to: '/guides/brawl-mode',
          items: [
            {
              label: 'Self-Control',
              to: '/guides/self-control',
              id: 'BRAWL_SELF_CONTROL',
            },
            {
              label: 'Eye of the Tempest',
              to: '/guides/eye-of-the-tempest',
              id: 'BRAWL_EYE_OF_THE_TEMPEST',
            },
            {
              label: 'Freedom Fight',
              to: '/guides/freedom-fight',
              id: 'BRAWL_FREEDOM_FIGHT',
            },
            {
              label: 'Noble Coalition',
              to: '/guides/noble-coalition',
              id: 'BRAWL_NOBLE_COALITION',
            },
            {
              label: 'More Brawl guides',
              to: '/guides/brawl-mode',
              id: 'BRAWL_MODE',
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
              label: 'Ranked Tier List',
              to: '/tier-list/ranked',
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
