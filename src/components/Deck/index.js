import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Mana from '../Mana'
import sortByMana from '../../helpers/sortByMana'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCard from '../../helpers/isCard'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import useFluidSizing from '../../hooks/useFluidSizing'
import './index.css'

export default React.memo(function Deck(props) {
  const { collection } = React.useContext(CollectionContext)
  const showEmptySlots =
    typeof props.showEmptySlots === 'undefined' ? true : props.showEmptySlots
  const sort = props.sort || sortByMana
  const slots = props.deck.map(getResolvedCardData).sort(sort)
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
                props.showUpgrades &&
                  isCardUpgradable(collection.find(c => c.id === card.id)) &&
                  'Deck__card--upgradable',
                card.rarity === 'legendary' && `Deck__card--legendary`,
                highlightedCards.length > 0 &&
                  !highlightedCards.find(isCard(card)) &&
                  'Deck__card--excluded',
                card.missing && 'Deck__card--missing',
              ]
                .filter(Boolean)
                .join(' ')}
              key={card.id + index}
              data-testid={[card.id, card.idx].filter(Boolean).join('_')}
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

              <Mana
                className={[
                  'Deck__mana',
                  card.costReduced && 'Deck__mana--reduced',
                ]
                  .filter(Boolean)
                  .join(' ')}
                mana={card.mana}
              />
              <span className='Deck__name'>{card.name}</span>
              <img className='Deck__image' src={card.image} alt={card.name} />
              <span
                className='Deck__level'
                data-testid={
                  card.token ? 'deck-token-level' : 'deck-card-level'
                }
              >
                {card.level}
              </span>
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
