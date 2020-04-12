import unfoldValue from './unfoldValue'
import { getCardCost } from './getCollectionCost'

const FACTIONS_ORDER = ['neutral', 'winter', 'ironclad', 'shadowfen', 'swarm']

export const sortByValue = (a, b) => {
  const costA = getCardCost(a)
  const costB = getCardCost(b)

  if (costA > costB) return -1
  if (costA < costB) return +1

  return sortNaturally()(a, b)
}

const sortNaturally = (level = 0) => (a, b) => {
  const factionIndexA = FACTIONS_ORDER.indexOf(a.faction)
  const factionIndexB = FACTIONS_ORDER.indexOf(b.faction)

  if (factionIndexA > factionIndexB) return +1
  if (factionIndexA < factionIndexB) return -1

  const manaA = +unfoldValue(a.mana)[level]
  const manaB = +unfoldValue(b.mana)[level]

  if (manaA > manaB) return +1
  if (manaA < manaB) return -1

  return a.name > b.name ? +1 : -1
}

export default sortNaturally
