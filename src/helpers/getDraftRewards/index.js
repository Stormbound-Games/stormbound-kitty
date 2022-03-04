import { WeeklyIncome } from '~/helpers/Income'

const WINS = [
  { cards: [2, 1, 0, 0] },
  { cards: [3, 2, 1, 0], stones: 1 },
  { cards: [0, 4, 2, 0], stones: 2 },
  { cards: [0, 4, 2, 0], stones: 3, coins: 150 },
  { cards: [0, 0, 4, 2], stones: 4 },
  { cards: [0, 0, 5, 2], stones: 5, coins: 250 },
  { cards: [0, 0, 4, 3], stones: 6, coins: 600 },
]

const PREMIUM_PASS_BONUSES = [
  { coins: 50, stones: 1 },
  { coins: 100, stones: 1 },
  { coins: 100, stones: 1 },
  { cards: [0, 0, 1, 0], coins: 100, stones: 1 },
  { cards: [0, 0, 1, 0], coins: 150, stones: 1 },
  { cards: [0, 0, 0, 1], coins: 250, stones: 2 },
  { cards: [0, 0, 0, 1], coins: 400, stones: 3 },
]

const getDraftRewards = (books, sessions, wins, withPremiumPass) => {
  const rewards = new WeeklyIncome(books)

  for (let i = 0; i < sessions; i++) {
    rewards.add(WINS[wins])
    if (withPremiumPass) rewards.add(PREMIUM_PASS_BONUSES[wins])
  }

  return rewards
}

export default getDraftRewards
