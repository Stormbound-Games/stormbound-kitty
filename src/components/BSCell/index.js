import React from 'react'
import './index.css'

const getTitle = props => {
  if (props.mode === 'DISPLAY' || !props.card.id) {
    return undefined
  }

  const poisoned = props.poisoned ? '(poisoned)' : ''
  const frozen = props.frozen ? '(frozen)' : ''
  const confused = props.confused ? '(confused)' : ''
  const level = `(lvl ${props.level})`
  const name = `“${props.card.name}”`
  const strength = `× ${props.strength}`
  const player = `from ${props.player}`

  return [name, level, strength, player, poisoned, frozen, confused].join(' ')
}

const BSCell = props => (
  <button
    className={[
      'BSCell',
      !!props.activePlayer && `BSCell--${props.activePlayer}`,
      props.isDragging && 'BSCell--dragging',
      props.mode === 'DISPLAY' && 'BSCell--display',
      props.poisoned && 'BSCell--poisoned',
      props.frozen && 'BSCell--frozen',
      props.confused && 'BSCell--confused'
    ]
      .filter(Boolean)
      .join(' ')}
    type="button"
    aria-pressed={props.isActive}
    onClick={props.onClick}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseOver={props.onMouseOver}
    data-testid={props['data-testid']}
    title={getTitle(props)}
  >
    {props.strength > 0 && (
      <span
        data-testid="cell-strength"
        className={[
          'BSCell__strength',
          props.player && `BSCell__strength--${props.player}`
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="BSCell__strength-content">{props.strength}</span>
      </span>
    )}

    {props.card.id ? (
      <img
        className="BSCell__image"
        src={props.card.image}
        alt={props.card.name}
        data-testid="cell-image"
      />
    ) : (
      <span className="visually-hidden">Select cell</span>
    )}

    {!!props.poisoned && (
      <div
        className="BSCell__dots BSCell__dots--poisoned"
        data-testid="cell-poisoned"
      >
        <span className="BSCell__dot BSCell__dot--bubble" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot BSCell__dot--bubble" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot BSCell__dot--bubble" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot BSCell__dot--bubble" />
      </div>
    )}

    {!!props.confused && (
      <div
        className="BSCell__dots BSCell__dots--confused"
        data-testid="cell-confused"
      >
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
        <span className="BSCell__dot" />
      </div>
    )}

    {!!props.frozen && (
      <span className="BSCell__frozen" data-testid="cell-frozen" />
    )}
  </button>
)

export default BSCell
