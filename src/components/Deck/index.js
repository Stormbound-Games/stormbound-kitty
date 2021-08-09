import React from 'react'
import { useFela } from 'react-fela'
import { CollectionContext } from '../CollectionProvider'
import Image from '../Image'
import Mana from '../Mana'
import Card from '../Card'
import Tooltip from '../Tooltip'
import sortByMana from '../../helpers/sortByMana'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCard from '../../helpers/isCard'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import useFluidSizing from '../../hooks/useFluidSizing'
import styles from './styles'

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
  const { css } = useFela({ isEmpty: true, orientation: props.orientation })

  return (
    <li className={css(styles.card)}>
      <Mana extend={styles.mana({ orientation: props.orientation })} mana='' />
      <span className='VisuallyHidden'>Empty deck slot</span>
    </li>
  )
})

const DeckSlot = React.memo(function DeckSlot(props) {
  if (!props.card) {
    return props.showEmptySlots ? <DeckEmptySlot {...props} /> : null
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
  const card = props.card
  const { indexedCollection } = React.useContext(CollectionContext)
  const highlightedCards = props.highlightedCards || []
  const isUpgradable =
    props.showUpgrades &&
    !card.token &&
    isCardUpgradable(indexedCollection[card.id])
  const isExcluded =
    highlightedCards.length > 0 && !highlightedCards.find(isCard(card))
  const { css } = useFela({
    orientation: props.orientation,
    faction: card.faction,
    type: card.type,
    isUpgradable,
    isLegendary: card.rarity === 'legendary',
    isExcluded,
    isMissing: card.missing,
  })

  return (
    <li
      {...props.trigger}
      className={css(styles.card)}
      data-testid={[card.id, card.idx].filter(Boolean).join('_')}
    >
      {props.onClick && (
        <button
          type='button'
          className={css(styles.button)}
          onClick={() => props.onClick(card)}
          disabled={props.isCardDisabled ? props.isCardDisabled(card) : false}
        >
          <span className='VisuallyHidden'>{props.onClickLabel}</span>
        </button>
      )}

      <Mana
        mana={card.mana}
        extend={styles.mana({
          orientation: props.orientation,
          isDecreased: card.manaDecreased,
          isIncreased: card.manaIncreased,
        })}
      />
      <span className={css(styles.name)}>{card.name}</span>
      <Image
        extend={styles.image({ orientation: props.orientation })}
        src={'/assets/images/cards/' + card.image}
        alt={card.name}
        width={24}
        height={24}
      />
      <span
        className={css(styles.level)}
        data-testid={card.token ? 'deck-token-level' : 'deck-card-level'}
      >
        {card.level}
      </span>
    </li>
  )
})

export default React.memo(function Deck(props) {
  const orientation = props.orientation || 'vertical'
  const { css } = useFela({ orientation })
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
      className={css(styles.deck)}
      style={{ '--font-size': fontSize }}
      ref={ref}
      id={props.id}
    >
      <ul className={css(styles.list)}>
        {slots.map((card, index) => (
          <DeckSlot
            key={card ? card.id + index : index}
            {...props}
            orientation={orientation}
            showEmptySlots={showEmptySlots}
            card={card}
          />
        ))}
      </ul>
    </div>
  )
})
