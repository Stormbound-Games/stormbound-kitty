import React from 'react'
import TierListHeader from '../TierListHeader'
import TierListItem from '../TierListItem'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const TierList = props => {
  const cards = props.cards.map(getRawCardData)

  return (
    <div className='TierList' style={{ '--color': props.color }}>
      <TierListHeader {...props} cards={cards} />

      <div
        className={[
          'TierList__body',
          props.isDragging && 'TierList__body--dragging',
        ]
          .filter(Boolean)
          .join(' ')}
        onMouseUp={() => props.onMouseUp()}
      >
        {cards.length ? (
          cards.map((card, index) => (
            <TierListItem
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
          <p className='TierList__empty'>
            There are currently no cards in this tier.{' '}
            {props.isEditable &&
              'Try adding a card to it to have it displayed here.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default TierList
