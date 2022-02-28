import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Image from '~/components/Image'
import BlankButton from '~/components/BlankButton'
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
        style={{ '--color': `var(--${props.card.faction})` }}
        title={props.card.name}
      >
        <Image
          src={props.card.image}
          alt={props.card.name}
          extend={styles.image}
          width={60}
          height={60}
          lazy
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
            src={props.cards[props.dndSource].image + '&w=60'}
            alt={props.card.name}
            extend={styles.image}
            width={60}
            height={60}
            lazy
          />
        </span>
      )}

      <BlankButton
        onMouseDown={
          props.onMouseDown ? () => props.onMouseDown(props.index) : undefined
        }
        onMouseOver={
          props.onMouseOver ? () => props.onMouseOver(props.index) : undefined
        }
        onMouseUp={
          props.onMouseUp ? () => props.onMouseUp(props.index) : undefined
        }
        onClick={() => props.removeCard(props.card.id)}
        extend={styles.item}
        style={{ '--color': `var(--${props.card.faction})` }}
        label={'Remove ' + props.card.name + ' from list'}
        title={'Remove ' + props.card.name + ' from list'}
      >
        <Image
          src={props.card.image}
          alt={props.card.name}
          extend={styles.image}
          width={60}
          height={60}
          lazy
        />
      </BlankButton>

      {shouldDisplayPlaceholderAfter && (
        <span className={css(styles.item({ isPlaceholder: true }))}>
          <Image
            src={props.cards[props.dndSource].image}
            alt={props.card.name}
            extend={styles.image}
            width={60}
            height={60}
            lazy
          />
        </span>
      )}
    </>
  )
})
