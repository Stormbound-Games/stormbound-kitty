import serialization from '~/helpers/serialization'
import getRawCardData from '~/helpers/getRawCardData'

const isValidCard = card =>
  Boolean(getRawCardData(card.id).name) && !isNaN(card.level)

const deckId = {
  title: 'ID',
  name: 'deckId',
  type: 'string',
  description: 'The Stormbound-Kitty ID of a deck (not the Stormbound one).',
  validation: Rule => Rule.required().lowercase(),
}

export default deckId
