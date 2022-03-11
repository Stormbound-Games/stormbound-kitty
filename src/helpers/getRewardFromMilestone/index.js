import { RARITIES } from '~/constants/game'

const getRewardFromMilestone = milestone => {
  const { reward, rewardAmount } = milestone

  if (reward.includes('_BOOK')) {
    const bookType = reward.replace('_BOOK', '')

    return { books: Array.from({ length: rewardAmount }, _ => bookType) }
  }

  if (reward.includes('_CARD')) {
    return {
      cards: RARITIES.map(rarity => rarity.toUpperCase()).map(rarity =>
        reward.includes(rarity) ? rewardAmount : 0
      ),
    }
  }

  if (reward === 'COINS') return { coins: rewardAmount }
  if (reward === 'RUBIES') return { rubies: rewardAmount }
  if (reward === 'FUSION_STONES') return { stones: rewardAmount }

  return {}
}

export default getRewardFromMilestone
