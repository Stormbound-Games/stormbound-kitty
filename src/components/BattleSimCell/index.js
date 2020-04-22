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

const BattleSimCell = props => (
  <button
    className={[
      'BattleSimCell',
      !!props.activePlayer && `BattleSimCell--${props.activePlayer}`,
      props.isDragging && 'BattleSimCell--dragging',
      props.mode === 'DISPLAY' && 'BattleSimCell--display',
      props.poisoned && 'BattleSimCell--poisoned',
      props.frozen && 'BattleSimCell--frozen',
      props.confused && 'BattleSimCell--confused',
    ]
      .filter(Boolean)
      .join(' ')}
    type='button'
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
        data-testid='cell-strength'
        className={[
          'BattleSimCell__strength',
          props.player && `BattleSimCell__strength--${props.player}`,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className='BattleSimCell__strength-content'>
          {props.strength}
        </span>
      </span>
    )}

    {props.card.id ? (
      <img
        className='BattleSimCell__image'
        src={props.card.image}
        alt={props.card.name}
        data-testid='cell-image'
      />
    ) : (
      <span className='VisuallyHidden'>Select cell</span>
    )}

    {!!props.poisoned && (
      <div
        className='BattleSimCell__dots BattleSimCell__dots--poisoned'
        data-testid='cell-poisoned'
      >
        <span className='BattleSimCell__dot BattleSimCell__dot--bubble' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot BattleSimCell__dot--bubble' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot BattleSimCell__dot--bubble' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot BattleSimCell__dot--bubble' />
      </div>
    )}

    {!!props.confused && (
      <div
        className='BattleSimCell__dots BattleSimCell__dots--confused'
        data-testid='cell-confused'
      >
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
        <span className='BattleSimCell__dot' />
      </div>
    )}

    {!!props.frozen && (
      <span className='BattleSimCell__frozen' data-testid='cell-frozen' />
    )}
  </button>
)

export default BattleSimCell
