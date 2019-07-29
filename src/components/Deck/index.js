import React from 'react'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import sortByMana from '../../helpers/sortByMana'
import useFluidSizing from '../../helpers/useFluidSizing'
import Mana from '../Mana'
import './index.css'

const Deck = props => {
  const slots = props.deck.map(resolveCardForLevel).sort(sortByMana)
  const highlightedCards = props.highlightedCards || []
  const { fontSize, ref } = useFluidSizing(0.03683665247)

  if (props.showEmptySlots && props.deck.length < 12) {
    const extraSlots = Array.from({ length: 12 - props.deck.length }, _ => null)

    slots.push(...extraSlots)
  }

  return (
    <div
      className={`Deck Deck--${props.orientation || 'vertical'}`}
      style={{ fontSize }}
      ref={ref}
      id={props.id}
    >
      <ul className="Deck__list">
        {slots.map((card, index) =>
          card ? (
            <li
              className={[
                'Deck__card',
                `Deck__card--${card.faction}`,
                `Deck__card--${card.type}`,
                card.rarity === 'legendary' && `Deck__card--legendary`,
                highlightedCards.length > 0 &&
                  !highlightedCards.includes(card.id) &&
                  'Deck__card--excluded'
              ]
                .filter(Boolean)
                .join(' ')}
              key={card.id + index}
            >
              {props.onClick && (
                <button
                  type="button"
                  className="Deck__button"
                  onClick={() => props.onClick(card)}
                >
                  <span className="visually-hidden">{props.onClickLabel}</span>
                </button>
              )}

              <Mana className="Deck__mana" mana={card.mana} />
              <span className="Deck__name">{card.name}</span>
              <img className="Deck__image" src={card.image} alt={card.name} />
              <span className="Deck__level">{card.level}</span>
            </li>
          ) : props.showEmptySlots ? (
            <li className={`Deck__card Deck__card--empty`} key={index}>
              <Mana className="Deck__mana" mana="" />
              <span className="visually-hidden">Empty slot</span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
}

Deck.defaultProps = {
  showEmptySlots: true
}

export default Deck
