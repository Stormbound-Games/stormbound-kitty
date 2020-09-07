import React from 'react'
import ListBuilderTierHeader from '../ListBuilderTierHeader'
import ListBuilderTierItem from '../ListBuilderTierItem'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

export default React.memo(function ListBuilderTier(props) {
  const cards = props.cards.map(getRawCardData)

  return (
    <div className='ListBuilderTier' style={{ '--color': props.color }}>
      {(props.name || props.isEditable) && (
        <ListBuilderTierHeader {...props} cards={cards} />
      )}

      <div
        className={[
          'ListBuilderTier__body',
          props.isDragging && 'ListBuilderTier__body--dragging',
        ]
          .filter(Boolean)
          .join(' ')}
        onMouseUp={props.onMouseUp}
      >
        {cards.length ? (
          cards.map((card, index) => (
            <ListBuilderTierItem
              isEditable={props.isEditable}
              onMouseDown={props.onMouseDown}
              onMouseOver={props.onMouseOver}
              onMouseUp={props.onMouseUp}
              dndDirection={props.dndDirection}
              dndTarget={props.dndTarget}
              dndSource={props.dndSource}
              isDragging={props.isDragging}
              removeCard={props.removeCard}
              cards={cards}
              card={card}
              index={index}
              key={card.id}
            />
          ))
        ) : (
          <p className='ListBuilderTier__empty'>
            There are currently no cards in this tier.{' '}
            {props.isEditable &&
              'Try adding a card to it to have it displayed here.'}
          </p>
        )}
      </div>
    </div>
  )
})
