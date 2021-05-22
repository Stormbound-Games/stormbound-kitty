import { DailyIncome } from '../Income'
import getVictoryCoins from '../getVictoryCoins'

const getActivityRewards = ({
  preferTier3Stones,
  setup,
  wins,
  withDailyHumble,
  withDailyQuests,
}) => {
  const rewards = new DailyIncome()

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
    rewards.add({ coins: 30 + wins * getVictoryCoins(setup) })
  }

  return rewards
}

export default getActivityRewards
