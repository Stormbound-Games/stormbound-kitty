import { RARITIES } from '~/constants/game'
import unfoldValue from '~/helpers/unfoldValue'
import { getCardCost } from '~/helpers/getCollectionCost'
import getExtraAfterMax from '~/helpers/getExtraAfterMax'

const FACTIONS_ORDER = ['neutral', 'winter', 'ironclad', 'shadowfen', 'swarm']
const factions = FACTIONS_ORDER
const rarities = Object.keys(RARITIES)

export const sortByLockedCoins = (a, b) => {
  const { coins: extraA } = getExtraAfterMax(a)
  const { coins: extraB } = getExtraAfterMax(b)

  if (extraA > extraB) return -1
  if (extraA < extraB) return +1

  return sortNaturally()(a, b)
}

export const sortByValue = cardsIndex => (a, b) => {
  const costA = getCardCost(cardsIndex, a)
  const costB = getCardCost(cardsIndex, b)

  // Put the missing cards at the end of the collection
  if (a.missing && !b.missing) return +1
  if (!a.missing && b.missing) return -1

  // Then order cards per level, 5 to 1
  if (a.level < b.level) return +1
  if (a.level > b.level) return -1

  // Then order cards per rarity, legendary to common
  if (rarities.indexOf(a.rarity) < rarities.indexOf(b.rarity)) return +1
  if (rarities.indexOf(a.rarity) > rarities.indexOf(b.rarity)) return -1

  // Then order cards per faction, neutral first
  if (factions.indexOf(a.faction) < factions.indexOf(b.faction)) return -1
  if (factions.indexOf(a.faction) > factions.indexOf(b.faction)) return +1

  // Then order cards per value (copies), highest to lowest
  if (costA < costB) return +1
  if (costA > costB) return -1

  // Finally sort cards alphabetically
  return sortNaturally()(a, b)
}

const sortNaturally =
  ({ withFaction = true } = {}) =>
  (a, b) => {
    const factionIndexA = FACTIONS_ORDER.indexOf(a.faction)
    const factionIndexB = FACTIONS_ORDER.indexOf(b.faction)

    if (withFaction && factionIndexA > factionIndexB) return +1
    if (withFaction && factionIndexA < factionIndexB) return -1

    const manaA = +unfoldValue(a.mana)[0]
    const manaB = +unfoldValue(b.mana)[0]

    if (a.token && !b.token) return +1
    if (!a.token && b.token) return -1

    if (manaA > manaB) return +1
    if (manaA < manaB) return -1

    return a.name > b.name ? +1 : -1
  }

export default sortNaturally
