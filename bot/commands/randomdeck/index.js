import { FACTIONS } from '~/constants/game'
import areAllValuesEqual from '~/helpers/areAllValuesEqual'
import arrayRandom from '~/helpers/arrayRandom'
import searchCards from '~/helpers/searchCards'
import getEmbed from '~/helpers/getEmbed'
import getRandomDeck from '~/helpers/getRandomDeck'
import handleSearchAlias from '~/helpers/handleSearchAlias'
import serialization from '~/helpers/serialization'
import getAbbreviations from '~/api/misc/getAbbreviations'
import getCards from '~/api/cards/getCards'

const ALLOWED_FACTIONS = FACTIONS.filter(faction => faction !== 'neutral')

const findFaction = message => {
  const terms = message.split(/[\s,]+/g).filter(Boolean)

  for (let term of terms) {
    if (FACTIONS.includes(term)) return [term, term]
    else {
      const [key, value] = handleSearchAlias(term)
      if (key === 'faction') return [term, value]
    }
  }

  return []
}

export const parseMessage = (allCards, abbreviations, message) => {
  // Find the faction of the deck (if any), as well as the term that describes
  // it; either a faction name (e.g. shadowfen), or an alias (e.g. sf).
  const [authored, resolved] = findFaction(message)

  // Remove the term describing the faction from the message to be left with
  // potential cards to include in the deck.
  message = message.replace(authored, '').trim()

  const parts = message.split(/\s*,\s*/g).filter(Boolean)
  const cards = []
  const ignored = []

  parts.forEach(part => {
    // Make sure not to include a card twice. For instance, `herald, herald`
    // should include Pan Heralds and Herald’s Hymn, but not one of them twice.
    // Same goes for other cases, such as `dread, dread`.
    const card = searchCards(allCards, abbreviations, part).find(
      card => !cards.map(c => c.id).includes(card.id)
    )
    if (card) cards.push(card)
    else ignored.push(part)
  })

  return {
    faction: { authored, resolved },
    including: cards,
    ignored,
  }
}

export const validateFaction = (faction, including = []) => {
  const randomFaction = arrayRandom(ALLOWED_FACTIONS)

  // If the provided faction is “neutral”, abort as a random deck cannot be
  // neutral.
  if (faction === 'neutral') return null

  // If there are no included cards, return the provided faction, if any, or a
  // random one.
  if (including.length === 0) return faction || randomFaction

  const factions = including
    .filter(card => card.faction !== 'neutral')
    .map(card => card.faction)

  // If the provided cards are from different factions (but not neutral), abort
  // as a random deck cannot be multi-faction.
  if (!areAllValuesEqual(factions)) {
    return null
  }

  // If some of the included cards are neither neutral, nor from the provided
  // faction, abort as there is a conflict between the provided faction and the
  // provided cards.
  if (faction && factions.some(card => card.faction !== faction)) {
    return null
  }

  // Otherwise return the provided faction if any, or the faction of an included
  // card if any and not neutral, or a random faction.
  return faction || factions[0] || randomFaction
}

const randomdeck = {
  command: 'randomdeck',
  label: '🎲  Random Deck',
  aliases: [],
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/deck')
      .setDescription(
        `Randomly generate a deck. It optionally accepts a faction and up to 3 cards (separated with commas) to include in the deck (regardless of order or casing). For instance, \`!${this.command} ic\` or \`!${this.command} rof,bragda\`.`
      )
  },
  handler: async function (message) {
    const cards = await getCards()
    const abbreviations = await getAbbreviations({ casing: 'LOWERCASE', cards })
    const { faction, including } = parseMessage(
      cards,
      abbreviations,
      message.toLowerCase()
    )
    const resolvedFaction = validateFaction(faction.resolved, including)
    const embed = getEmbed()
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/deck')

    // If there was an issue resolving the faction, return early.
    if (!resolvedFaction) {
      embed.setDescription(
        'Unfortunately, there was an issue generating a random deck. This might be because of conflicting argument (e.g. `wp rof`, `fc, mia`…).'
      )

      return embed
    }

    const initialCards = including.length ? including.slice(0, 3) : undefined
    const deck = getRandomDeck({
      availableCards: cards,
      initialCards,
      faction: resolvedFaction,
    })
    const id = serialization.deck.serialize(deck)

    return 'https://stormbound-kitty.com/deck/' + id
  },
}

export default randomdeck
