import React from 'react'
import Mana from '../Mana'
import sortByMana from '../../helpers/sortByMana'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import useFluidSizing from '../../hooks/useFluidSizing'
import './index.css'

export default React.memo(function Deck(props) {
  const showEmptySlots =
    typeof props.showEmptySlots === 'undefined' ? true : props.showEmptySlots
  const sort = props.sort || sortByMana
  const slots = props.deck.map(resolveCardForLevel).sort(sort)
  const highlightedCards = props.highlightedCards || []
  const { fontSize, ref } = useFluidSizing(0.03683665247)

  if (showEmptySlots && props.deck.length < 12) {
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
      <ul className='Deck__list'>
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
                  'Deck__card--excluded',
                card.missing && 'Deck__card--missing',
              ]
                .filter(Boolean)
                .join(' ')}
              key={card.id + index}
              data-testid={card.id}
            >
              {props.onClick && (
                <button
                  type='button'
                  className='Deck__button'
                  onClick={() => props.onClick(card)}
                  disabled={
                    props.isCardDisabled ? props.isCardDisabled(card) : false
                  }
                >
                  <span className='VisuallyHidden'>{props.onClickLabel}</span>
                </button>
              )}

              <Mana className='Deck__mana' mana={card.mana} />
              <span className='Deck__name'>{card.name}</span>
              <img className='Deck__image' src={card.image} alt={card.name} />
              <span className='Deck__level'>{card.level}</span>
            </li>
          ) : showEmptySlots ? (
            <li className={`Deck__card Deck__card--empty`} key={index}>
              <Mana className='Deck__mana' mana='' />
              <span className='VisuallyHidden'>Empty slot</span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
})
