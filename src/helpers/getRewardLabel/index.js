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
      return enhanced ? (
        <Common amount={amount} />
      ) : (
        `${amount} common card${amount === 1 ? '' : 's'}`
      )
    case 'RARE_CARD':
      return enhanced ? (
        <Rare amount={amount} />
      ) : (
        `${amount} rare card${amount === 1 ? '' : 's'}`
      )
    case 'EPIC_CARD':
      return enhanced ? (
        <Epic amount={amount} />
      ) : (
        `${amount} epic card${amount === 1 ? '' : 's'}`
      )
    case 'LEGENDARY_CARD':
      return enhanced ? (
        <Legendary amount={amount} />
      ) : (
        `${amount} legendary card${amount === 1 ? '' : 's'}`
      )
    default:
      return null
  }
}

export default getRewardLabel
