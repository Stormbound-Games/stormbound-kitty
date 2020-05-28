const CARD_SEARCH = [
  '⚡️ **Card search** (e.g. `!cardinfo rof`)',
  '       *Get information about the card(s) matching given search criteria*',
]

const ABBREVIATIONS = [
  '❔ **Abbreviations** (e.g. `!abbr AoE`)',
  '       *Get the meaning of a card or popular abbreviation*',
]

const RANDOM_CARD = [
  '🎲 **Random card** (e.g. `!randomcard ic spell rare`)',
  '       *Get a random card matching given search criteria*',
]

const DECK_SEARCH = [
  '🔍 **Deck search** (e.g. `!deck ic d1 mia`)',
  '       *Get a link to a deck search matching given search criteria*',
]

const DECK_ADVICE = [
  '💎 **Deck advice** (e.g. `!deckadvice https://stormbound-kitty.com/deck/3n13n23s13n33s243s23n633n673s63n153s83s11`)',
  '       *Get advice and suggestions for the given deck.*',
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
  DECK_ADVICE,
]

export default () => {
  return ['', ...COMMANDS.map(command => command.join('\n'))].join('\n')
}
