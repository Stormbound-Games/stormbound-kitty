const COMMANDS = [
  {
    command: 'cardinfo',
    name: 'Card search',
    example: 'rof',
    description:
      'Get information about the card(s) matching given search criteria',
    icon: '⚡️',
  },
  {
    command: 'randomcard',
    name: 'Random card',
    example: 'ic spell rare',
    description: 'Get a random card matching given search criteria',
    icon: '🃏',
  },
  {
    command: 'abbr',
    name: 'Abbreviations',
    example: 'AoE',
    description: 'Get the meaning of a card or popular abbreviation',
    icon: '❔',
  },
  {
    command: 'decks',
    name: 'Deck search',
    example: 'ic d1 mia',
    description: 'Get a link to a deck search matching given search criteria',
    icon: '🔍',
  },
  {
    command: 'suggestdeck',
    name: 'Deck suggestion',
    example: 'sf qordia',
    description: 'Get a deck suggestion matching given search criteria',
    icon: '✅',
  },
  {
    command: 'deckadvice',
    name: 'Deck advice',
    example:
      'https://stormbound-kitty.com/deck/3n13n23s13n33s243s23n633n673s63n153s83s11',
    description: 'Get advice and suggestions for the given deck',
    icon: '💎',
  },
  {
    command: 'randomdeck',
    name: 'Random deck',
    example: 'sf',
    description:
      'Get a randomly generated deck (matching the given faction if any)',
    icon: '🎲',
  },
  {
    command: 'story',
    name: 'Story search',
    example: 'mia',
    description: 'Get links to stories matching given search criteria',
    icon: '📝',
  },
]

export default COMMANDS
