import { base64Decode } from '../base64'

export const serialiseList = tiers =>
  tiers
    .filter(tier => tier.cards.length > 0)
    .map(tier => [encodeURIComponent(tier.name), tier.cards.join('')].join(','))
    .join(';')

export const deserialiseList = hash => {
  try {
    // The former format for serialised tier lists used to rely on base64
    // encoding, which has eventually been removed due to the increase in URL
    // lengths.
    const string = base64Decode(hash)

    return deserialiseList(string)
  } catch (error) {
    return hash.split(';').map(value => {
      const [name = '', cards = ''] = value.split(',')

      return {
        name: decodeURIComponent(name),
        cards: cards.match(/[NWIFS]\d+/g) || [],
      }
    })
  }
}

export default {
  serialise: card => serialiseList(card),
  deserialise: hash => deserialiseList(hash),
}
