import { MonthlyIncome } from '~/helpers/Income'

const getHeroesLeagueRewards = (books, position) => {
  const rewards = new MonthlyIncome(books)

  if (position === 'TOP_1') {
    rewards.stones += 100
    rewards.openBook(['ARCHDRAGON', 'FELINE', 'DRAGON', 'PIRATE'])
  } else if (position === 'TOP_10') {
    rewards.stones += 50
    rewards.openBook(['FELINE', 'DRAGON', 'PIRATE'])
  } else if (position === 'TOP_100') {
    rewards.stones += 25
    rewards.openBook(['DRAGON', 'PIRATE'])
  } else if (position === 'TOP_500') {
    rewards.stones += 10
    rewards.openBook('PIRATE')
  }

  return rewards
}

export default getHeroesLeagueRewards
