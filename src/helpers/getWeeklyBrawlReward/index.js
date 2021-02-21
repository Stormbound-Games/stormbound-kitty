import { BOOKS } from '../../constants/game'
import getAverageStonesPerBook from '../getAverageStonesPerBook'

const DEFAULT_STATE = { coins: 0, rubies: 0, stones: 0, cards: [0, 0, 0, 0] }

const BRAWL_REWARDS = [
  {
    stones: getAverageStonesPerBook('HUMBLE'),
    cards: [
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[0],
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[1],
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[2],
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[3],
    ],
  },
  { rubies: 5 },
  {
    stones: getAverageStonesPerBook('CLASSIC'),
    cards: [
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[0],
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[1],
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[2],
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[3],
    ],
  },
  { stones: 10 },
  {
    stones: getAverageStonesPerBook('MYTHIC'),
    cards: [
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[0],
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[1],
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[2],
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[3],
    ],
  },
  { cards: [0, 0, 0, 1] },
  { stones: 50 },
  { rubies: 250 },
  { cards: [0, 0, 0, 5] },
  { stones: 200 },
]

const getWeeklyBrawlReward = milestone => {
  const rewards = { ...DEFAULT_STATE, cards: [...DEFAULT_STATE.cards] }

  for (let i = 0; i <= milestone; i += 1) {
    const reward = BRAWL_REWARDS[i]

    if (reward.coins) rewards.coins += reward.coins
    if (reward.rubies) rewards.rubies += reward.rubies
    if (reward.stones) rewards.stones += reward.stones
    if (reward.cards) {
      rewards.cards[0] += reward.cards[0]
      rewards.cards[1] += reward.cards[1]
      rewards.cards[2] += reward.cards[2]
      rewards.cards[3] += reward.cards[3]
    }
  }

  return rewards
}

export default getWeeklyBrawlReward
