import { MonthlyIncome } from '#helpers/Income'
import arrayRandom from '#helpers/arrayRandom'

const getHeroesLeagueRewards = (books, position) => {
  const rewards = new MonthlyIncome(books)
  const bookTypes = [
    'CHAOS',
    'CONSTRUCT',
    'DRAGON',
    'DWARF',
    'ELDER',
    'FELINE',
    'FROSTLING',
    'KNIGHT',
    'MAGIC',
    'PIRATE',
    'RAVEN',
    'RODENT',
    'STRUCTURE',
    'TEMPLE',
    'TOAD',
    'UNDEAD',
  ]

  if (position === 'TOP_1') {
    rewards.stones += 100 + 50 + 30 + 20
    rewards.openBook(arrayRandom(['ARCHDRAGON', 'MYTHIC', 'LEGENDS']))
  } else if (position === 'TOP_10') {
    rewards.stones += 50 + 30 + 20
    rewards.openBook(arrayRandom(bookTypes))
  } else if (position === 'TOP_100') {
    rewards.stones += 30 + 20
    rewards.openBook(arrayRandom(bookTypes))
  } else if (position === 'TOP_250') {
    rewards.stones += 20
    rewards.openBook(arrayRandom(bookTypes))
  }

  return rewards
}

export default getHeroesLeagueRewards
