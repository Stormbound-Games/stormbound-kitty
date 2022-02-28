import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import BlankButton from '~/components/BlankButton'
import styles from './styles'

const getTitle = props => {
  if (props.mode === 'DISPLAY' || !props.card.id) {
    return undefined
  }

  const { strength, card, level, player } = props
  const name = card.name
  const side = player === 'RED' ? 'enemy' : 'friendly'
  const statuses = ['poisoned', 'vitalized', 'frozen', 'confused', 'disabled']
    .filter(status => props[status])
    .join(', ')
  return `${strength}-strength ${side} ${name} (lvl ${level}) (${statuses})`
}

export default React.memo(function BattleSimCell(props) {
  const styleProps = {
    activePlayer: props.activePlayer,
    player: props.player,
    isActive: props.isActive,
    isDragging: props.isDragging,
    isDisplay: props.mode === 'DISPLAY',
    isPoisoned: props.poisoned,
    isVitalized: props.vitalized,
    isFrozen: props.frozen,
    isConfused: props.confused,
    isDisabled: props.disabled,
  }
  const { css } = useFela(styleProps)

  return (
    <BlankButton
      extend={styles.cell(styleProps)}
      aria-pressed={props.isActive}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseOver}
      data-testid={props['data-testid']}
      title={getTitle(props)}
      label={props.mode === 'DISPLAY' ? '' : 'Select cell'}
    >
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
          src={props.card.image + '&w=60'}
          alt={props.card.name}
          data-testid='cell-image'
          width={60}
          height={60}
          lazy
        />
      ) : null}

      {!!(props.poisoned || props.vitalized) && (
        <div
          className={css(styles.dots)}
          data-testid={props.poisoned ? 'cell-poisoned' : 'cell-vitalized'}
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
    </BlankButton>
  )
})
