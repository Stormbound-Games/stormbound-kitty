import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Image from '../Image'
import styles from './styles'

export default React.memo(function ListBuilderTierItem(props) {
  const { css } = useFela({
    isDragging:
      props.isDragging &&
      props.dndSource === props.index &&
      props.dndTarget !== null &&
      props.dndTarget !== props.index,
  })

  if (!props.isEditable) {
    return (
      <Link
        to={'/card/' + props.card.id + '/display'}
        extend={styles.item}
        style={{ '--faction': `var(--${props.card.faction})` }}
        title={props.card.name}
      >
        <Image
          src={'/assets/images/cards/' + props.card.image}
          alt={props.card.name}
          extend={styles.image}
          withAvif
        />
        <span aria-hidden className={css(styles.name)}>
          {props.card.name}
        </span>
      </Link>
    )
  }

  // The placeholder should be displayed if we are currently dragging the
  // current element and we already have moved away from it
  const shouldDisplayPlaceholder =
    props.isDragging &&
    props.dndTarget === props.index &&
    props.dndTarget !== props.dndSource
  // The placeholder should be displayed before if the direction is left and
  // we’re not hovering the source
  const shouldDisplayPlaceholderBefore =
    shouldDisplayPlaceholder &&
    props.dndDirection === -1 &&
    props.dndTarget + props.dndDirection !== props.dndSource
  // The placeholder should be displayed after if the direction is right and
  // we’re not hovering the source
  const shouldDisplayPlaceholderAfter =
    shouldDisplayPlaceholder &&
    props.dndDirection === +1 &&
    props.dndTarget + props.dndDirection !== props.dndSource

  return (
    <>
      {shouldDisplayPlaceholderBefore && (
        <span className={css(styles.item({ isPlaceholder: true }))}>
          <Image
            src={'/assets/images/cards/' + props.cards[props.dndSource].image}
            alt={props.card.name}
            extend={styles.image}
            withAvif
          />
        </span>
      )}

      <button
        onMouseDown={
          props.onMouseDown ? () => props.onMouseDown(props.index) : undefined
        }
        onMouseOver={
          props.onMouseOver ? () => props.onMouseOver(props.index) : undefined
        }
        onMouseUp={
          props.onMouseUp ? () => props.onMouseUp(props.index) : undefined
        }
        type='button'
        onClick={() => props.removeCard(props.card.id)}
        className={css(styles.item, {
          '--color': `var(--${props.card.faction})`,
        })}
        title={'Remove ' + props.card.name + ' from list'}
      >
        <Image
          src={'/assets/images/cards/' + props.card.image}
          alt={props.card.name}
          extend={styles.image}
          withAvif
        />
      </button>

      {shouldDisplayPlaceholderAfter && (
        <span className={css(styles.item({ isPlaceholder: true }))}>
          <Image
            src={'/assets/images/cards/' + props.cards[props.dndSource].image}
            alt={props.card.name}
            extend={styles.image}
            withAvif
          />
        </span>
      )}
    </>
  )
})
