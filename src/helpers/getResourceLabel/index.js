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
import Icon from '~/components/Icon'
import getBookName from '~/helpers/getBookName'

const getResourceLabel = (entry, enhanced = false) => {
  const amount = entry.rewardAmount || entry.amount
  const type = entry.reward || entry.type

  if (type.endsWith('_BOOK')) {
    return `${amount} ${getBookName(type, amount !== 1)}`
  }

  switch (type) {
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
    case 'AD':
      return enhanced ? (
        <>
          <Icon
            icon='youtube'
            extend={{ transform: 'translateY(2px)', color: 'var(--beige)' }}
          />{' '}
          {amount} ad{amount === 1 ? '' : 's'}
        </>
      ) : (
        `${amount} ad${amount === 1 ? '' : 's'}`
      )
    default:
      return null
  }
}

export default getResourceLabel
