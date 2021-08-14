import React from 'react'
import { useFela } from 'react-fela'
import Image from '../Image'
import BlankButton from '../BlankButton'
import styles from './styles'

const getTitle = props => {
  if (props.mode === 'DISPLAY' || !props.card.id) {
    return undefined
  }

  const { strength, card, level, player } = props
  const name = card.name
  const side = player === 'RED' ? 'enemy' : 'friendly'
  const statuses = ['poisoned', 'vitalised', 'frozen', 'confused', 'disabled']
    .filter(status => props[status])
    .join(', ')
  return `${strength}-strength ${side} ${name} (lvl ${level}) (${statuses})`
}

const CellContent = props => {
  const { css } = useFela({
    activePlayer: props.activePlayer,
    player: props.player,
    isDragging: props.isDragging,
    isDisplay: props.mode === 'DISPLAY',
    isPoisoned: props.poisoned,
    isVitalised: props.vitalised,
    isFrozen: props.frozen,
    isConfused: props.confused,
    isDisabled: props.disabled,
  })

  return (
    <>
      {props.strength > 0 && (
        <span
          data-testid='cell-strength'
          className={css(styles.strength)}
          data-player={props.player}
        >
          <span className={css(styles.strengthContent)}>{props.strength}</span>
        </span>
      )}

      {props.card.id ? (
        <Image
          extend={styles.image}
          src={'/assets/images/cards/' + props.card.image}
          alt={props.card.name}
          data-testid='cell-image'
        />
      ) : null}

      {!!(props.poisoned || props.vitalised) && (
        <div
          className={css(styles.dots)}
          data-testid={props.poisoned ? 'cell-poisoned' : 'cell-vitalised'}
        >
          <span className={css(styles.dot({ isBubble: true }))} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot({ isBubble: true }))} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot({ isBubble: true }))} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot({ isBubble: true }))} />
        </div>
      )}

      {!!props.confused && (
        <div className={css(styles.dots)} data-testid='cell-confused'>
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
          <span className={css(styles.dot)} />
        </div>
      )}

      {!!props.frozen && (
        <span className={css(styles.frozen)} data-testid='cell-frozen' />
      )}

      {!!props.disabled && (
        <span className={css(styles.disabled)} data-testid='cell-disabled'>
          &times;
        </span>
      )}
    </>
  )
}

export default React.memo(function BattleSimCell(props) {
  if (props.mode === 'DISPLAY') return <CellContent {...props} />

  return (
    <BlankButton
      extend={styles.cell}
      aria-pressed={props.isActive}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseOver}
      data-testid={props['data-testid']}
      title={getTitle(props)}
      label={props.mode === 'DISPLAY' ? '' : 'Select cell'}
    >
      <CellContent {...props} />
    </BlankButton>
  )
})
