import serialization from '~/helpers/serialization'
import getRawCardData from '~/helpers/getRawCardData'

const isValidCard = card =>
  Boolean(getRawCardData(card.id).name) && !isNaN(card.level)

const deckId = {
  title: 'ID',
  name: 'deckId',
  type: 'string',
  description: 'The Stormbound-Kitty ID of a deck (not the Stormbound one).',
  validation: Rule =>
    Rule.required()
      .lowercase()
      .custom(string => {
        try {
          const deck = serialization.deck.deserialize(string)

          return deck.every(isValidCard) || 'Invalid deck ID.'
        } catch {
          return 'Invalid deck ID.'
        }
      }),
}

export default deckId
