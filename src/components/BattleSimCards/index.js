import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import BlankButton from '~/components/BlankButton'
import Card from '~/components/Card'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import styles from './styles'

export default React.memo(function BattleSimCards(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { css } = useFela()

  return (
    <>
      <div className={css(styles.cards)}>
        {[0, 1, 2, 3].map(index => {
          const card = getResolvedCardData(cardsIndex, props.cards[index]) || {}

          return (
            <div
              className={css(styles.slot)}
              key={card.id || index}
              data-testid={`card-slot-${index}`}
            >
              {card.id ? (
                <BlankButton
                  data-testid='card-slot-button'
                  extend={styles.button}
                  onClick={() => props.zoom(card)}
                  label='Enlarge card'
                />
              ) : null}
              <div
                className={css(styles.slotContent)}
                data-testid='card-slot-content'
              >
                {card && card.id ? (
                  <Card {...card} affordable={card.mana <= props.mana} />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
})
