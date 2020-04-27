import React from 'react'
import Image from '../Image'
import ProgressBar from '../ProgressBar'
import { RARITY_COPIES } from '../../constants/game'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

export default React.memo(function CardProgress(props) {
  const { rarity } = getRawCardData(props.card.id)

  // If the card is not found, there is no concept of card progress
  if (!rarity) {
    return null
  }

  const { level, copies, missing } = props.card
  const { stonesForMissing } = RARITY_COPIES[rarity]
  const max = missing
    ? stonesForMissing
    : RARITY_COPIES[rarity].copies[level - 1]
  const current = missing ? 0 : copies

  // If the card is already level 5, there is no concept of progress
  if (level === 5) {
    return null
  }

  return (
    <div className='CardProgress'>
      <Image
        src={missing ? '/assets/images/stones.png' : '/assets/images/cards.png'}
        alt=''
        className={[
          'CardProgress__image',
          missing && 'CardProgress__image--stone',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <ProgressBar value={current} min={0} max={max} />
      <span className='CardProgress__label'>{current + '/' + max}</span>
    </div>
  )
})
