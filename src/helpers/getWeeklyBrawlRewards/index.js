import { BOOKS } from '../../constants/game'
import getAverageStonesPerBook from '../getAverageStonesPerBook'
import { WeeklyIncome } from '../Income'

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

const getWeeklyBrawlRewards = milestone => {
  const rewards = new WeeklyIncome()

  for (let i = 0; i <= milestone; i += 1) rewards.add(BRAWL_REWARDS[i])

  return rewards
}

export default getWeeklyBrawlRewards
