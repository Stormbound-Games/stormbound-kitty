import React from 'react'
import { Coins, Rubies, Stones } from '../../components/Resource'

const getRewardLabel = (entry, enhanced = false) => {
  const amount = entry.rewardAmount || entry.amount

  switch (entry.reward) {
    case 'HUMBLE_BOOK':
      return `${amount} Humble Book${amount === 1 ? '' : 's'}`
    case 'RUBIES':
      return enhanced ? (
        <Rubies amount={amount} />
      ) : (
        `${amount} rub${amount === 1 ? 'y' : 'ies'}`
      )
    case 'COINS':
      return enhanced ? (
        <Coins amount={amount} />
      ) : (
        `${amount} coin${amount === 1 ? '' : 's'}`
      )
    case 'CLASSIC_TOME':
      return `${amount} Classic Tome${amount === 1 ? '' : 's'}`
    case 'FUSION_STONES':
      return enhanced ? (
        <Stones amount={amount} />
      ) : (
        `${amount} fusion stone${amount === 1 ? '' : 's'}`
      )
    case 'HEROIC_TOME':
      return `${amount} Heroic Tome${amount === 1 ? '' : 's'}`
    case 'MYTHIC_TOME':
      return `${amount} Mythic Tome${amount === 1 ? '' : 's'}`
    case 'COMMON_CARD':
      return `${amount} common card${amount === 1 ? '' : 's'}`
    case 'RARE_CARD':
      return `${amount} rare card${amount === 1 ? '' : 's'}`
    case 'EPIC_CARD':
      return `${amount} epic card${amount === 1 ? '' : 's'}`
    case 'LEGENDARY_CARD':
      return `${amount} legendary card${amount === 1 ? '' : 's'}`
    default:
      return null
  }
}

export default getRewardLabel
