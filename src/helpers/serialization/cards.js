import indexOf from '~/helpers/indexOf'
import areAllValuesEqual from '~/helpers/areAllValuesEqual'

const serializeCards = cards => {
  // To be entirely honest I’m not sure I fully remember how we can have cards
  // that do not have an ID here; maybe when passing a deck with empty slots?
  cards = cards.filter(card => card && card.id)

  // Token cards are serialized a little different since their strength is
  // carried in the level slot (see below), so we cannot use the global level
  // when some cards are tokens.
  const hasToken = cards.some(card => card.token || card.id.startsWith('T'))
  const hasUniqueLevel = areAllValuesEqual(cards.map(card => card.level))

  // If there are more than 2 cards, none of them are tokens, and they all have
  // the same level, we can use the global level to increase compression.
  const canUseGlobalLevel = hasUniqueLevel && !hasToken && cards.length > 2

  if (canUseGlobalLevel) {
    return cards[0].level + 'x' + cards.map(card => card.id).join('')
  }

  return cards
    .map(
      card =>
        // Because the serialized cards are joined together without commas and
        // because tokens carry their strength in their level, we need a
        // deterministic approach to deserialize them later on.
        String(card.level).padStart(card.token ? 2 : 1, '0') + card.id
    )
    .join('')
}

const deserializeCards = string => {
  let count = 0

  // If the base64 decoded string contains commas, it was originally encoded
  // with the old serialization system, and these commas need to be removed
  // for the new system to work.
  string = string.replace(/,/g, '')

  const cards = []
  const factionRegex = /[NSFWITR]/i
  let globalLevel = null

  // If the ID starts with a number followed by a `x`, it uses the global level
  // to improve compression. The level of every card is therefore the first
  // number, and the actual ID starts at the 3rd slot, after the `x`.
  if (/^([1-5])x/i.test(string)) {
    globalLevel = string[0]
    string = string.slice(2)
  }

  while (string.length && count++ < 12) {
    // Find the first faction (or token) indicator
    const indexOfFaction = indexOf(string, factionRegex)
    // If the deck is prefixed by a global level (e.g. `5x`), take this value as
    // level; otherwise, anything before the faction/token indicator is the
    // level (or strength in case of a token)
    const level = globalLevel || string.slice(0, indexOfFaction)
    // Find the next faction (or token) indicator
    const nextFaction = indexOf(string, factionRegex, indexOfFaction + 1)
    // In case of a token, the strength will always be issued as 2 digits (with
    // a 0 pad if necessary), otherwise the level is stored in a single digit or
    // skipped entirely if the global level is used
    const offset = globalLevel ? 0 : /t/i.test(string[nextFaction]) ? 2 : 1
    // Anything from the faction to the next faction minus the level offset is
    // the card ID
    const id = string
      .slice(indexOfFaction, nextFaction ? nextFaction - offset : undefined)
      .toUpperCase()
    // Push the card and slice off the string to start at the new card
    cards.push({ id, level: +level })
    string = nextFaction ? string.slice(nextFaction - offset) : ''
  }

  return cards
}

const cards = {
  serialize: cards => serializeCards(cards),
  deserialize: string => deserializeCards(string),
}

export default cards
