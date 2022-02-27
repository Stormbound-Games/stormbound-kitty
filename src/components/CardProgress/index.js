import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import Image from '~/components/Image'
import ProgressBar from '~/components/ProgressBar'
import { RARITY_COPIES } from '~/constants/game'
import styles from './styles'

export default React.memo(function CardProgress(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { level, copies, missing } = props.card
  const { css } = useFela({ isStone: missing })
  const { rarity } = cardsIndex[props.card.id]

  // If the card is not found, there is no concept of card progress
  if (!rarity) {
    return null
  }

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
    <div className={css(styles.progress)}>
      <Image
        src={
          missing
            ? '/assets/images/iconography/stones.png'
            : '/assets/images/iconography/cards.png'
        }
        alt={missing ? 'Fusion stones' : 'Card copies'}
        extend={styles.image}
        width={41}
        height={missing ? 52 : 38}
        lazy
      />
      <ProgressBar value={current} min={0} max={max} />
      <span className={css(styles.label)}>{current + '/' + max}</span>
    </div>
  )
})
