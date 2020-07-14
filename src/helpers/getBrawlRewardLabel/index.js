const getBrawlRewardLabel = milestone => {
  const amount = milestone.rewardAmount

  switch (milestone.reward) {
    case 'HUMBLE_BOOK':
      return `${amount} Humble Book${amount === 1 ? '' : 's'}`
    case 'RUBIES':
      return `${amount} rub${amount === 1 ? 'y' : 'ies'}`
    case 'CLASSIC_TOME':
      return `${amount} Classic Tome${amount === 1 ? '' : 's'}`
    case 'FUSION_STONES':
      return `${amount} fusion stone${amount === 1 ? '' : 's'}`
    case 'MYTHIC_TOME':
      return `${amount} Mythic Tome${amount === 1 ? '' : 's'}`
    case 'LEGENDARY_CARD':
      return `${milestone.rewardAmount} legendary card${
        amount === 1 ? '' : 's'
      }`
    default:
      return null
  }
}

export default getBrawlRewardLabel
