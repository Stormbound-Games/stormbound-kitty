const deckId = {
  title: 'ID',
  name: 'deckId',
  type: 'string',
  description: 'The Stormbound-Kitty ID of a deck (not the Stormbound one).',
  validation: Rule => Rule.required().lowercase(),
}

export default deckId
