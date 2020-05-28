import indexOf from '../indexOf'

// Exported for testing purposes
export const serialiseCards = cards =>
  cards
    .filter(card => card && card.id)
    .map(
      card =>
        // Because the serialised cards are joined together without commas,
        // because tokens carry their strength in their level, we need a
        // deterministic approach to deserialise them later on.
        String(card.level).padStart(card.token ? 2 : 1, '0') + card.id
    )
    .join('')

// Exported for testing purposes
export const deserialiseCards = string => {
  let count = 0
  // If the base64 decoded string contains commas, it was originally encoded
  // with the old serialisation system, and these commas need to be removed
  // for the new system to work.
  string = string.replace(/,/g, '')

  const cards = []
  const factionRegex = /[NSFWIT]/

  while (string.length && count++ < 12) {
    // Find the first faction (or token) indicator
    const indexOfFaction = indexOf(string, factionRegex)
    // Anything before the faction/token indicator is the level (or strength in
    // case of a token)
    const level = string.slice(0, indexOfFaction)
    // Find the next faction (or token) indicator
    const nextFaction = indexOf(string, factionRegex, indexOfFaction + 1)
    // In case of a token, the strength will always be issued as 2 digits (with
    // a 0 pad if necessary), otherwise the level is stored in a single digit
    const offset = string[nextFaction] === 'T' ? 2 : 1
    // Anything from the faction to the next faction minus the level offset is
    // the card ID
    const id = string.slice(
      indexOfFaction,
      nextFaction ? nextFaction - offset : undefined
    )
    // Push the card and slice off the string to start at the new card
    cards.push({ id, level: +level })
    string = nextFaction ? string.slice(nextFaction - offset) : ''
  }

  return cards
}

export default {
  serialise: cards => serialiseCards(cards),
  deserialise: string => deserialiseCards(string),
}
