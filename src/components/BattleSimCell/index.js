import React from 'react'
import './index.css'

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

export default React.memo(function BattleSimCell(props) {
  return (
    <button
      className={[
        'BattleSimCell',
        !!props.activePlayer && `BattleSimCell--${props.activePlayer}`,
        props.isDragging && 'BattleSimCell--dragging',
        props.mode === 'DISPLAY' && 'BattleSimCell--display',
        props.poisoned && 'BattleSimCell--poisoned',
        props.vitalised && 'BattleSimCell--vitalised',
        props.frozen && 'BattleSimCell--frozen',
        props.confused && 'BattleSimCell--confused',
        props.disabled && 'BattleSimCell--disabled',
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
          src={'/assets/images/cards/' + props.card.image}
          alt={props.card.name}
          data-testid='cell-image'
        />
      ) : (
        <span className='VisuallyHidden'>
          {props.mode === 'DISPLAY' ? '' : 'Select cell'}
        </span>
      )}

      {!!(props.poisoned || props.vitalised) && (
        <div
          className={[
            'BattleSimCell__dots',
            props.poisoned && 'BattleSimCell__dots--poisoned',
            props.vitalised && 'BattleSimCell__dots--vitalised',
          ]
            .filter(Boolean)
            .join(' ')}
          data-testid={props.poisoned ? 'cell-poisoned' : 'cell-vitalised'}
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

      {!!props.disabled && (
        <span className='BattleSimCell__disabled' data-testid='cell-disabled'>
          &times;
        </span>
      )}
    </button>
  )
})
