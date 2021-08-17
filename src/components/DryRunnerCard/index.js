import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '~/components/BlankButton'
import Card from '~/components/Card'
import isCard from '~/helpers/isCard'
import styles from './styles'

export default React.memo(function DryRunnerCard(props) {
  const cardData = props.deck.find(isCard(props.card))
  const isActive = isCard(props.activeCard)(cardData)
  const { css } = useFela({ isActive })

  if (!cardData) return null

  return (
    <div className={css(styles.wrapper)} data-active={isActive || undefined}>
      <BlankButton
        extend={styles.button}
        onClick={() => props.selectCard(props.card)}
        label={isActive ? 'Unselect card' : 'Select card'}
      />
      <Card
        {...cardData}
        missing={!!props.activeCard && !isActive}
        affordable={props.canCardBePlayed(props.card)}
      />
    </div>
  )
})
