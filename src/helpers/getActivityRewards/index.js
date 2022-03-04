import { DailyIncome } from '~/helpers/Income'
import getDailyCoinsCounter from '~/helpers/getDailyCoinsCounter'

const getActivityRewards = (
  books,
  {
    league,
    preferTier3Stones,
    setup,
    wins,
    withDailyHumble,
    withDailyQuests,
    withPremiumPass,
  }
) => {
  const rewards = new DailyIncome(books)

  if (withDailyHumble) {
    rewards.openBook('HUMBLE')
  }

  if (withDailyQuests) {
    rewards.add({
      coins: 100 + ((preferTier3Stones ? 5 : 6) / 9) * 150,
      rubies: 5,
      stones: ((preferTier3Stones ? 4 : 3) / 9) * 2,
    })
  }

  if (wins > 0) {
    const getCoins = getDailyCoinsCounter({ setup, league, withPremiumPass })
    const coins = Array.from({ length: wins }).reduce(
      (acc, _) => acc + getCoins(),
      0
    )

    rewards.add({ coins })
  }

  return rewards
}

export default getActivityRewards
