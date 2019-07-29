import React, { Fragment } from 'react'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import Card from '../Card'
import CTA from '../CTA'
import './index.css'

const BSCards = props => {
  const [cycleMode, setCycleMode] = React.useState(false)

  return (
    <Fragment>
      {cycleMode && (
        <div className="BSCards__overlay" onClick={() => setCycleMode(false)} />
      )}

      <div
        className={['BSCards', cycleMode && 'BSCards--cycle']
          .filter(Boolean)
          .join(' ')}
      >
        {props.canCycleCard && (
          <CTA
            type="button"
            onClick={() => setCycleMode(m => !m)}
            className="BSCards__cycle-button"
            aria-pressed={cycleMode}
          >
            Cycle card
          </CTA>
        )}

        {[0, 1, 2, 3].map(index => {
          const cardId = props.hand[index]
          const card = resolveCardForLevel(
            props.cards.find(card => card.id === cardId)
          )
          const buttonLabel =
            !card && props.canDrawCard
              ? 'Draw card'
              : cycleMode
              ? 'Cycle card'
              : 'Enlarge card'

          return (
            <div
              className="BSCards__slot"
              key={index}
              data-testid={`card-slot-${index}`}
            >
              {!card && !props.canDrawCard ? null : (
                <button
                  type="button"
                  data-testid="card-slot-button"
                  className={[
                    'BSCards__button',
                    !card && 'BSCards__button--empty'
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
                  <span className="visually-hidden">{buttonLabel}</span>
                </button>
              )}

              <div className="BSCards__slot-content">
                {card && card.id ? (
                  <Card {...card} affordable={card.mana <= props.mana} />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default BSCards
