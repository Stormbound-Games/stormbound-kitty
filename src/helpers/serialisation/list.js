import { base64Decode, isBase64 } from '~/helpers/base64'

export const serialiseList = tiers =>
  tiers
    .filter(tier => tier.cards.length > 0)
    .map(tier => [encodeURIComponent(tier.name), tier.cards.join('')].join(','))
    .join(';')

export const deserialiseList = hash => {
  // The former format for serialised tier lists used to rely on base64
  // encoding, which has eventually been removed due to the increase in URL
  // lengths.
  if (isBase64(hash)) {
    return deserialiseList(base64Decode(hash))
  }

  return hash.split(';').map(value => {
    const [name = '', cards = ''] = value.split(',')

    return {
      name: decodeURIComponent(name),
      cards: cards.match(/[NWIFS]\d+/g) || [],
    }
  })
}

export default {
  serialise: card => serialiseList(card),
  deserialise: hash => deserialiseList(hash),
}
