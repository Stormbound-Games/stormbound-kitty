import getCards from '#api/cards/getCards'
import indexArray from '#helpers/indexArray'
import serialization from '#helpers/serialization'
import { getShortFaction } from '#helpers/encoding'
import { FACTIONS } from '#constants/game'

const SHORT_FACTIONS = FACTIONS.map(getShortFaction)
const DOMAIN = process.env.STORMBOUND_CARD_DATA_API_DOMAIN
const TOKEN = process.env.STORMBOUND_API_KEY
const headers = { Authorization: 'bearer ' + TOKEN }

const sortCardsByFaction = (a, b) =>
  SHORT_FACTIONS.indexOf(a[0]) - SHORT_FACTIONS.indexOf(b[0])

const getLeagueTierList = async ({ cards, league, isPreview } = {}) => {
  if (!cards) cards = await getCards({ isPreview })

  const endpoint = DOMAIN + '/get_league_data?league=' + league
  const response = await fetch(endpoint, { headers })
  const items = await response.json()

  if (!items || !items.length) return null

  const cardsIndexBySid = indexArray(cards, 'sid')

  // Array of tiers (at most)
  // 0 -> “0.9 – 1.0”, 1 -> “0.8 – 0.9”, 2 -> “0.7 – 0.8”…
  let tiers = Array.from({ length: 10 }, (_, index) => {
    const upper = 1 - index * 0.1
    const lower = Math.abs(upper - 0.1)
    const name = lower.toFixed(1) + ' – ' + upper.toFixed(1)

    return { name, cards: [] }
  })

  items.forEach(item => {
    const card = cardsIndexBySid[item.card_id]
    const presence = item.count_in_deck / item.unique_decks
    const tier = Math.max(
      tiers.length - Math.floor(presence * tiers.length) - 1,
      0
    )

    if (card) {
      // Add the card to the tier.
      tiers[tier].cards.push(card.id)

      // Ideally we’d sort cards properly with the `sortCards` helper, but that
      // implies resolving cards first, which seems a little unnecessary when all
      // we want is sorting them by faction.
      tiers[tier].cards.sort(sortCardsByFaction)
    }
  })

  // Preserve only tiers that have at least a card
  tiers = tiers.filter(({ cards }) => cards.length > 0)

  // Drop the 0.0 – 0.1 tier since it contains most cards and doesn’t provide
  // much value.
  tiers.pop()

  return serialization.list.serialize(tiers)
}

export default getLeagueTierList
