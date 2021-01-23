import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Mana from '../Mana'
import Card from '../Card'
import Box from '../Box'
import Tooltip from '../Tooltip'
import Title from '../Title'
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

const CardVariants = React.memo(function CardVariants(props) {
  const position = props.index < 6 ? 'right' : 'left'
  const orientation =
    props.orientation === 'vertical' ? 'horizontal' : 'vertical'

  return (
    <Tooltip
      label={
        <Box style={{ width: 'auto', paddingBottom: 0, fontSize: '80%' }}>
          <div className={`Deck__variants Deck__variants--${position}`}>
            <Title element='p'>Variants</Title>
            <Deck
              deck={props.variants}
              showEmptySlots={false}
              fontSize={`calc(${props.fontSize} * 0.8)`}
              orientation={orientation}
            />
          </div>
        </Box>
      }
      position={position}
      style={{
        backgroundColor: 'transparent',
        border: 0,
        whiteSpace: 'normal',
        boxShadow: 'none',
        filter: 'drop-shadow(0 1em 2em rgba(0, 0, 0, 0.2))',
      }}
    >
      {trigger => (
        <span {...trigger} className='Deck__button'>
          <span className='VisuallyHidden'>
            Check variants {props.card.name}
          </span>
        </span>
      )}
    </Tooltip>
  )
})

const DeckSlotContent = React.memo(function DeckSlotContent(props) {
  const { indexedCollection } = React.useContext(CollectionContext)
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
          !card.token &&
          isCardUpgradable(indexedCollection[card.id]) &&
          'Deck__card--upgradable',
        props.variants.length > 0 && 'Deck__card--variants',
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

      {props.variants.length > 0 && <CardVariants {...props} />}

      <Mana
        className={[
          'Deck__mana',
          card.manaDecreased && 'Deck__mana--decreased',
          card.manaIncreased && 'Deck__mana--increased',
        ]
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

const Deck = function Deck(props) {
  const showEmptySlots =
    typeof props.showEmptySlots === 'undefined' ? true : props.showEmptySlots
  const sort = props.sort || sortByMana
  const slots = props.deck.map(getResolvedCardData).sort(sort)
  const { fontSize, ref } = useFluidSizing(0.03683665247)
  const variants = props.variants || {}

  if (showEmptySlots && props.deck.length < 12) {
    const extraSlots = Array.from({ length: 12 - props.deck.length }, _ => null)

    slots.push(...extraSlots)
  }

  return (
    <div
      className={`Deck Deck--${props.orientation || 'vertical'}`}
      style={{ '--font-size': props.fontSize || fontSize }}
      ref={ref}
      id={props.id}
    >
      <ul className='Deck__list'>
        {slots.map((card, index) => (
          <DeckSlot
            key={card ? card.id + index : index}
            index={index}
            {...props}
            showEmptySlots={showEmptySlots}
            card={card}
            variants={card ? variants[card.id] || [] : []}
            fontSize={fontSize}
          />
        ))}
      </ul>
    </div>
  )
}

export default React.memo(Deck)
