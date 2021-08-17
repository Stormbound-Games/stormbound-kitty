import React from 'react'
import {
  Coins,
  Rubies,
  Stones,
  Common,
  Rare,
  Epic,
  Legendary,
} from '~/components/Resource'
import getBookName from '~/helpers/getBookName'

const getRewardLabel = (entry, enhanced = false) => {
  const amount = entry.rewardAmount || entry.amount

  switch (entry.reward) {
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
    case 'FUSION_STONES':
      return enhanced ? (
        <Stones amount={amount} />
      ) : (
        `${amount} fusion stone${amount === 1 ? '' : 's'}`
      )
    case 'NOBLE_BOOK':
    case 'CLASSIC_BOOK':
    case 'HEROIC_BOOK':
    case 'MYTHIC_BOOK':
    case 'FELINE_BOOK':
    case 'PIRATE_BOOK':
    case 'DRAGON_BOOK':
    case 'ARCHDRAGON_BOOK':
    case 'HUMBLE_BOOK':
      return `${amount} ${getBookName(entry.reward, amount !== 1)}`
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
