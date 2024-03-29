import React from 'react'
import { useFela } from 'react-fela'
import Image from '#components/Image'
import BlankButton from '#components/BlankButton'
import styles from './styles'

const getTitle = props => {
  if (!props.card.id) {
    return undefined
  }

  const { strength, card, level, player } = props
  const name = card.name
  const side = player === 'RED' ? 'enemy' : 'friendly'
  const statuses = ['poisoned', 'vitalized', 'frozen', 'confused', 'disabled']
    .filter(status => props[status])
    .join(', ')
  return `${strength}-strength ${side} ${name} (lvl ${level}) ${
    statuses.length ? `(${statuses})` : ''
  }`
}

const CellButton = props => (
  <BlankButton
    extend={styles.cell(getStyleProps(props))}
    aria-pressed={props.isActive}
    onClick={props.onClick}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseOver={props.onMouseOver}
    data-testid={props['data-testid']}
    data-cell-coords={props['data-cell-coords']}
    title={getTitle(props)}
    label={props.mode === 'DISPLAY' ? 'Zoom cell' : 'Select cell'}
  >
    {props.children}
  </BlankButton>
)

const EmptyCell = props => {
  const { css } = useFela()

  return (
    <div
      data-testid={props['data-testid']}
      data-cell-coords={props['data-cell-coords']}
      className={css(styles.cell(getStyleProps(props)))}
    >
      {props.children}
    </div>
  )
}

const getStyleProps = props => ({
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
})

export default React.memo(function BattleSimCell(props) {
  const styleProps = getStyleProps(props)
  const { css } = useFela(styleProps)
  const CellComponent = props.onClick ? CellButton : EmptyCell

  return (
    <CellComponent {...props}>
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
          src={props.card.image}
          alt={props.card.name}
          data-testid='cell-image'
          width={120}
          height={120}
          lazy
        />
      ) : null}

      {!!(props.poisoned || props.vitalized) && (
        <div
          className={css(styles.dots)}
          data-testid={props.poisoned ? 'cell-poisoned' : 'cell-vitalized'}
        >
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
                isBubble: true,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
                isBubble: true,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
                isBubble: true,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
              })
            )}
          />
          <span
            className={css(
              styles.dot({
                isPoisoned: props.poisoned,
                isVitalized: props.vitalized,
                isBubble: true,
              })
            )}
          />
        </div>
      )}

      {!!props.confused && (
        <div className={css(styles.dots)} data-testid='cell-confused'>
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
          <span className={css(styles.dot({ isConfused: true }))} />
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
    </CellComponent>
  )
})
