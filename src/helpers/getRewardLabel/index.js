import React from 'react'
import {
  Coins,
  Rubies,
  Stones,
  Common,
  Rare,
  Epic,
  Legendary,
} from '../../components/Resource'

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
    case 'CLASSIC_BOOK':
      return `${amount} Classic book${amount === 1 ? '' : 's'}`
    case 'FUSION_STONES':
      return enhanced ? (
        <Stones amount={amount} />
      ) : (
        `${amount} fusion stone${amount === 1 ? '' : 's'}`
      )
    case 'HEROIC_BOOK':
      return `${amount} Heroic book${amount === 1 ? '' : 's'}`
    case 'MYTHIC_BOOK':
      return `${amount} Mythic book${amount === 1 ? '' : 's'}`
    case 'COMMON_CARD':
      return <Common amount={amount} />
    case 'RARE_CARD':
      return <Rare amount={amount} />
    case 'EPIC_CARD':
      return <Epic amount={amount} />
    case 'LEGENDARY_CARD':
      return <Legendary amount={amount} />
    default:
      return null
  }
}

export default getRewardLabel
