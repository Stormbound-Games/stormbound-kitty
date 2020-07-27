import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Mana from '../Mana'
import Card from '../Card'
import Tooltip from '../Tooltip'
import sortByMana from '../../helpers/sortByMana'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCard from '../../helpers/isCard'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import useFluidSizing from '../../hooks/useFluidSizing'
import './index.css'

const TOOLTIP_STYLES = {
  zIndex: 20,
  width: '180px',
  backgroundColor: 'transparent',
  border: 0,
  whiteSpace: 'normal',
  boxShadow: 'none',
  filter: 'drop-shadow(0 1em 2em rgba(0, 0, 0, 0.2))',
}

const DeckEmptySlot = React.memo(function DeckEmptySlot(props) {
  return (
    <li className='Deck__card Deck__card--empty'>
      <Mana className='Deck__mana' mana='' />
      <span className='VisuallyHidden'>Empty deck slot</span>
    </li>
  )
})

const DeckSlot = React.memo(function DeckSlot(props) {
  if (!props.card) {
    return props.showEmptySlots ? <DeckEmptySlot /> : null
  }

  if (!props.showTooltips) {
    return <DeckSlotContent {...props} />
  }

  return (
    <Tooltip
      label={<Card {...props.card} />}
      style={TOOLTIP_STYLES}
      position='left'
      offset={20}
    >
      {trigger => <DeckSlotContent {...props} trigger={trigger} />}
    </Tooltip>
  )
})

const DeckSlotContent = React.memo(function DeckSlotContent(props) {
  const { collection } = React.useContext(CollectionContext)
  const highlightedCards = props.highlightedCards || []
  const card = props.card

  return (
    <li
      {...props.trigger}
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
      data-testid={[card.id, card.idx].filter(Boolean).join('_')}
    >
      {props.onClick && (
        <button
          type='button'
          className='Deck__button'
          onClick={() => props.onClick(card)}
          disabled={props.isCardDisabled ? props.isCardDisabled(card) : false}
        >
          <span className='VisuallyHidden'>{props.onClickLabel}</span>
        </button>
      )}

      <Mana
        className={['Deck__mana', card.costReduced && 'Deck__mana--reduced']
          .filter(Boolean)
          .join(' ')}
        mana={card.mana}
      />
      <span className='Deck__name'>{card.name}</span>
      <img
        className='Deck__image'
        src={'/assets/images/cards/' + card.image}
        alt={card.name}
        width={24}
        height={24}
      />
      <span
        className='Deck__level'
        data-testid={card.token ? 'deck-token-level' : 'deck-card-level'}
      >
        {card.level}
      </span>
    </li>
  )
})

export default React.memo(function Deck(props) {
  const showEmptySlots =
    typeof props.showEmptySlots === 'undefined' ? true : props.showEmptySlots
  const sort = props.sort || sortByMana
  const slots = props.deck.map(getResolvedCardData).sort(sort)
  const { fontSize, ref } = useFluidSizing(0.03683665247)

  if (showEmptySlots && props.deck.length < 12) {
    const extraSlots = Array.from({ length: 12 - props.deck.length }, _ => null)

    slots.push(...extraSlots)
  }

  return (
    <div
      className={`Deck Deck--${props.orientation || 'vertical'}`}
      style={{ '--font-size': fontSize }}
      ref={ref}
      id={props.id}
    >
      <ul className='Deck__list'>
        {slots.map((card, index) => (
          <DeckSlot
            key={card ? card.id + index : index}
            {...props}
            showEmptySlots={showEmptySlots}
            card={card}
          />
        ))}
      </ul>
    </div>
  )
})
