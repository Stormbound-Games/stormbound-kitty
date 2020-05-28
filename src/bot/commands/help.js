const CARD_SEARCH = [
  '⚡️ **Card search** (e.g. `!card rof`)',
  '       *Get information about the card(s) matching given search criteria*',
]

const ABBREVIATIONS = [
  '❔ **Abbreviations** (e.g. `!abbr AoE`)',
  '       *Get the meaning of a card or popular abbreviation*',
]

const RANDOM_CARD = [
  '🎲 **Random card** (e.g. `!random ic spell rare`)',
  '       *Get a random card matching given search criteria*',
]

const DECK_SEARCH = [
  '🔍 **Deck search** (e.g. `!deck ic d1 mia`)',
  '       *Get a link to a deck search matching given search criteria*',
]

const STORY_SEARCH = [
  '📝 **Story search** (e.g. `!story mia`)',
  '       *Get links to stories matching given search criteria*',
]

const COMMANDS = [
  CARD_SEARCH,
  DECK_SEARCH,
  STORY_SEARCH,
  ABBREVIATIONS,
  RANDOM_CARD,
]

export default () => {
  return ['', ...COMMANDS.map(command => command.join('\n'))].join('\n')
}
