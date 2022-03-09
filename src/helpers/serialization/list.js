export const serializeList = tiers =>
  tiers
    .filter(tier => tier.cards.length > 0)
    .map(tier => [encodeURIComponent(tier.name), tier.cards.join('')].join(','))
    .join(';')

export const deserializeList = hash =>
  hash.split(';').map(value => {
    const [name = '', cards = ''] = value.split(',')

    return {
      name: decodeURIComponent(name),
      cards: cards.match(/[NWIFS]\d+/g) || [],
    }
  })

const list = {
  serialize: list => serializeList(list),
  deserialize: hash => deserializeList(hash),
}

export default list
