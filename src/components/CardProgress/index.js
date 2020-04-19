import React from 'react'
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
  const max = RARITY_COPIES[rarity].copies[level - 1]
  const current = copies

  // If the card is already level 5, there is no concept of progress
  if (level === 5) {
    return null
  }

  return (
    <div className='CardProgress'>
      <img
        src='/assets/images/cards.png'
        alt=''
        className='CardProgress__image'
      />
      <ProgressBar value={current} min={0} max={max} />
      <span className='CardProgress__label'>{current + '/' + max}</span>
    </div>
  )
}

export default CardProgress
