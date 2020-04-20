import React from 'react'
import CardSelect from '../CardSelect'
import Only from '../Only'
import './index.css'

const ListBuilderTierHeader = props => {
  return (
    <header className='ListBuilderTierHeader'>
      <div className='ListBuilderTierHeader__item'>
        {props.isEditable ? (
          <>
            <label className='ListBuilderTierHeader__label' htmlFor='listName'>
              Tier name
            </label>
            <input
              name='listName'
              id={`${props.prefix}listName`}
              type='text'
              value={props.name}
              className='ListBuilderTierHeader__name'
              onChange={event => props.onNameChange(event.target.value)}
              maxLength={30}
              placeholder='Unnamed tier'
            />
          </>
        ) : (
          <span className='ListBuilderTierHeader__name'>{props.name}</span>
        )}
      </div>

      <div className='ListBuilderTierHeader__item'>
        {props.isEditable ? (
          <>
            <label className='ListBuilderTierHeader__label' htmlFor='newCard'>
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
        <Only.Desktop>
          <div className='ListBuilderTierHeader__item'>
            <button
              type='button'
              onClick={props.moveUp}
              title='Move tier up'
              aria-label='Move tier up'
              className='ListBuilderTierHeader__move'
              disabled={!props.isEditable || !props.canMoveUp}
            >
              ↑
            </button>

            <button
              type='button'
              onClick={props.moveDown}
              title='Move tier down'
              aria-label='Move tier down'
              className='ListBuilderTierHeader__move'
              disabled={!props.isEditable || !props.canMoveDown}
            >
              ↓
            </button>
          </div>
        </Only.Desktop>
      )}
    </header>
  )
}

export default ListBuilderTierHeader
