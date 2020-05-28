import { base64Decode, base64Encode } from '../base64'

export const serialiseList = tiers =>
  tiers
    .filter(tier => tier.cards.length > 0)
    .map(tier => [encodeURIComponent(tier.name), tier.cards.join('')].join(','))
    .join(';')

export const deserialiseList = string =>
  string.split(';').map(value => {
    const [name = '', cards = ''] = value.split(',')

    return {
      name: decodeURIComponent(name),
      cards: cards.match(/[NWIFS]\d+/g) || [],
    }
  })

export default {
  serialise: card => base64Encode(serialiseList(card)),
  deserialise: hash => deserialiseList(base64Decode(hash)),
}
