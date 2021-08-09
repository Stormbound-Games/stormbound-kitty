import React from 'react'
import { useFela } from 'react-fela'
import Card from '../Card'
import CTA from '../CTA'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import indexArray from '../../helpers/indexArray'
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
          const card = getResolvedCardData(cardsIndex[cardId])
          const buttonLabel =
            !card && props.canDrawCard
              ? 'Draw card'
              : cycleMode
              ? 'Cycle card'
              : 'Enlarge card'

          return (
            <div
              className={css(styles.slot)}
              key={index}
              data-testid={`card-slot-${index}`}
            >
              {!card && !props.canDrawCard ? null : (
                <button
                  type='button'
                  data-testid='card-slot-button'
                  className={css(styles.button({ isEmpty: !card }))}
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
                >
                  <span className='VisuallyHidden'>{buttonLabel}</span>
                </button>
              )}

              <div className={css(styles.slotContent)}>
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
