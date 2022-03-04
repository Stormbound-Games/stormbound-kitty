import { MonthlyIncome } from '~/helpers/Income'

const CLIMBING_CARDS = {
  HEROES: [],
  DIAMOND: [0, 1, 2, 1, 3],
  PLATINUM: [0, 1, 2, 1, 2],
  GOLD: [0, 1, 0, 1, 2],
  SILVER: [0, 0, 1, 0, 2],
  BRONZE: [0, 0, 1, 0, 1],
  IRON: [0, 0, 0, 0, 1],
}

const getClimbingRewards = (books, league, rank) => {
  const rewards = new MonthlyIncome(books)
  const cards = CLIMBING_CARDS[league]

  cards.slice(0, cards.length - rank + 1).forEach(rank => {
    rewards.cards[rank] += 1
  })

  return rewards
}

export default getClimbingRewards
