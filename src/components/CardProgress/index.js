import React from 'react'
import Image from '../Image'
import ProgressBar from '../ProgressBar'
import { RARITY_COPIES } from '../../constants/game'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

const CardProgress = props => {
  const card = resolveCardForLevel(props.card)

  // If the card is not found, there is no concept of card progress
  if (!card) {
    return null
  }

  const { rarity, level, copies } = card
  const { stonesForMissing } = RARITY_COPIES[rarity]
  const max = card.missing
    ? stonesForMissing
    : RARITY_COPIES[rarity].copies[level - 1]
  const current = card.missing ? 0 : copies

  // If the card is already level 5, there is no concept of progress
  if (level === 5) {
    return null
  }

  return (
    <div className='CardProgress'>
      <Image
        src={
          card.missing
            ? '/assets/images/stones.png'
            : '/assets/images/cards.png'
        }
        alt=''
        className={[
          'CardProgress__image',
          card.missing && 'CardProgress__image--stone',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <ProgressBar value={current} min={0} max={max} />
      <span className='CardProgress__label'>{current + '/' + max}</span>
    </div>
  )
}

export default CardProgress
