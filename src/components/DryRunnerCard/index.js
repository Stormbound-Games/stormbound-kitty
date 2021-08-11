import React from 'react'
import { useFela } from 'react-fela'
import Card from '../Card'
import VisuallyHidden from '../VisuallyHidden'
import isCard from '../../helpers/isCard'
import styles from './styles'

export default React.memo(function DryRunnerCard(props) {
  const cardData = props.deck.find(isCard(props.card))
  const isActive = isCard(props.activeCard)(cardData)
  const { css } = useFela({ isActive })

  if (!cardData) return null

  return (
    <div className={css(styles.wrapper)} data-active={isActive || undefined}>
      <button
        className={css(styles.button)}
        type='button'
        onClick={() => props.selectCard(props.card)}
      >
        <VisuallyHidden>
          {isActive ? 'Unselect card' : 'Select card'}
        </VisuallyHidden>
      </button>
      <Card
        {...cardData}
        missing={!!props.activeCard && !isActive}
        affordable={props.canCardBePlayed(props.card)}
      />
    </div>
  )
})
