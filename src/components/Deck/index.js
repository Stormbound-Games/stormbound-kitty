import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import BlankButton from '~/components/BlankButton'
import Image from '~/components/Image'
import Mana from '~/components/Mana'
import Card from '~/components/Card'
import Tooltip from '~/components/Tooltip'
import VisuallyHidden from '~/components/VisuallyHidden'
import { sortByMana } from '~/helpers/sortCards'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCard from '~/helpers/isCard'
import isCardUpgradable from '~/helpers/isCardUpgradable'
import useFluidSizing from '~/hooks/useFluidSizing'
import styles from './styles'

const TOOLTIP_STYLES = {
  zIndex: 20,
  width: '180px',
  backgroundColor: 'transparent',
  border: 0,
  whiteSpace: 'normal',
  boxShadow: 'none',
  filter: 'drop-shadow(0 1em 2em #00000033)',
}

const DeckEmptySlot = React.memo(function DeckEmptySlot(props) {
  const { css } = useFela({ isEmpty: true, orientation: props.orientation })

  return (
    <li className={css(styles.card)} data-testid='deck-slot'>
      <Mana extend={styles.mana({ orientation: props.orientation })} mana='' />
      <VisuallyHidden>Empty deck slot</VisuallyHidden>
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
  const { cardsIndex } = React.useContext(CardsContext)
  const { indexedCollection } = React.useContext(CollectionContext)
  const highlightedCards = props.highlightedCards || []
  const isUpgradable =
    props.showUpgrades &&
    !card.token &&
    isCardUpgradable(cardsIndex, indexedCollection[card.id])
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
      data-testid={[card.id, card.idx].filter(Boolean).join('_') + ' deck-slot'}
    >
      {props.onClick && (
        <BlankButton
          extend={styles.button}
          onClick={() => props.onClick(card)}
          disabled={props.isCardDisabled ? props.isCardDisabled(card) : false}
          label={props.onClickLabel}
        />
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
        // Passing a width manually as 24 looks super blurry.
        src={card.image + '?w=50'}
        // Considering the image is rendered right next to the card name, there
        // is no value in repeating it.
        alt=''
        width={24}
        height={24}
        lazy
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
  const { cardsIndex } = React.useContext(CardsContext)
  const orientation = props.orientation || 'vertical'
  const { css } = useFela({ orientation })
  const showEmptySlots =
    typeof props.showEmptySlots === 'undefined' ? true : props.showEmptySlots
  const sort = props.sort || sortByMana(cardsIndex)
  const slots = props.deck
    .map(card => getResolvedCardData(cardsIndex, card))
    .sort(sort)
  const { fontSize, ref } = useFluidSizing(0.03683665247, props.containerWidth)

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
            {...props}
            key={card ? card.id + '-' + index : index}
            orientation={orientation}
            showEmptySlots={showEmptySlots}
            card={card}
          />
        ))}
      </ul>
    </div>
  )
})
