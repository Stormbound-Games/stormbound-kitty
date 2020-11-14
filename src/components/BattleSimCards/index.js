import React from 'react'
import Card from '../Card'
import CTA from '../CTA'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import indexArray from '../../helpers/indexArray'
import './index.css'

export default React.memo(function BattleSimCards(props) {
  const [cycleMode, setCycleMode] = React.useState(false)
  const cardsIndex = React.useMemo(() => indexArray(props.cards), [props.cards])

  return (
    <>
      {cycleMode && (
        <div
          className='BattleSimCards__overlay'
          onClick={() => setCycleMode(false)}
        />
      )}

      <div
        className={['BattleSimCards', cycleMode && 'BattleSimCards--cycle']
          .filter(Boolean)
          .join(' ')}
      >
        {props.canCycleCard && (
          <CTA
            type='button'
            onClick={() => setCycleMode(m => !m)}
            className='BattleSimCards__cycle-button'
            aria-pressed={cycleMode}
          >
            Cycle card
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
              className='BattleSimCards__slot'
              key={index}
              data-testid={`card-slot-${index}`}
            >
              {!card && !props.canDrawCard ? null : (
                <button
                  type='button'
                  data-testid='card-slot-button'
                  className={[
                    'BattleSimCards__button',
                    !card && 'BattleSimCards__button--empty',
                  ]
                    .filter(Boolean)
                    .join(' ')}
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

              <div className='BattleSimCards__slot-content'>
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
