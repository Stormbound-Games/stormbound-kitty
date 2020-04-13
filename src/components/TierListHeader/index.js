import React from 'react'
import CardSelect from '../CardSelect'
import './index.css'

const TierListHeader = props => {
  return (
    <header className='TierListHeader'>
      <div className='TierListHeader__item'>
        {props.isEditable ? (
          <>
            <label className='TierListHeader__label' htmlFor='listName'>
              Tier name
            </label>
            <input
              name='listName'
              id={`${props.prefix}listName`}
              type='text'
              value={props.name}
              className='TierListHeader__name'
              onChange={event => props.onNameChange(event.target.value)}
              maxLength={30}
              placeholder='Unnamed tier'
            />
          </>
        ) : (
          <span className='TierListHeader__name'>{props.name}</span>
        )}
      </div>

      <div className='TierListHeader__item'>
        {props.isEditable ? (
          <>
            <label className='TierListHeader__label' htmlFor='newCard'>
              Add card to tier
            </label>
            <CardSelect
              name='newCard'
              id={`${props.prefix}listName`}
              current=''
              onChange={option => props.addCard(option ? option.value : null)}
              disabledOptions={props.cards.map(card => card.id)}
              withSpells={true}
            />
          </>
        ) : null}
      </div>

      {props.isEditable && (
        <div className='TierListHeader__item'>
          <button
            type='button'
            onClick={props.moveUp}
            title='Move tier up'
            aria-label='Move tier up'
            className='TierListHeader__move'
            disabled={!props.isEditable || !props.canMoveUp}
          >
            ↑
          </button>

          <button
            type='button'
            onClick={props.moveDown}
            title='Move tier down'
            aria-label='Move tier down'
            className='TierListHeader__move'
            disabled={!props.isEditable || !props.canMoveDown}
          >
            ↓
          </button>
        </div>
      )}
    </header>
  )
}

export default TierListHeader
