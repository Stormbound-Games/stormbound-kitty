import React from 'react'
import { useFela } from 'react-fela'
import Card from '~/components/Card'
import CTA from '~/components/CTA'
import BlankButton from '~/components/BlankButton'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import indexArray from '~/helpers/indexArray'

import styles from './styles'

export default React.memo(function BattleSimCards(props) {
  const [cycleMode, setCycleMode] = React.useState(false)
  const { css } = useFela({ isCycle: cycleMode })
  const cardsIndex = React.useMemo(() => indexArray(props.cards), [props.cards])

  return (
    <>
      <div className={css(styles.cards)}>
        {props.canCycleCard && (
          <CTA
            type='button'
            onClick={() => setCycleMode(m => !m)}
            extend={styles.cycleButton}
            aria-pressed={cycleMode}
          >
            {cycleMode ? 'Cancel' : 'Cycle card'}
          </CTA>
        )}

        {[0, 1, 2, 3].map(index => {
          const cardId = props.hand[index]
          const card = getResolvedCardData(cardsIndex, cardsIndex[cardId])
          const buttonLabel =
            !card && props.canDrawCard
              ? 'Draw card'
              : cycleMode
              ? 'Cycle card'
              : 'Enlarge card'

          return (
            <div
              className={css(styles.slot)}
              key={cardId || index}
              data-testid={`card-slot-${index}`}
            >
              {!card && !props.canDrawCard ? null : (
                <BlankButton
                  data-testid='card-slot-button'
                  extend={styles.button({ isEmpty: !card })}
                  onClick={() => {
                    if (!card && props.canDrawCard) {
                      return props.drawCard()
                    }

                    if (cycleMode) {
                      props.cycleCard(card.id)
                      setCycleMode(false)
                    } else {
                      props.zoom({ id: card.id, level: card.level })
                    }
                  }}
                  label={buttonLabel}
                />
              )}

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
