import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import ListBuilderTierHeader from '~/components/ListBuilderTierHeader'
import ListBuilderTierItem from '~/components/ListBuilderTierItem'
import Spacing from '~/components/Spacing'
import styles from './styles'

export default React.memo(function ListBuilderTier(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { css } = useFela({ isDragging: props.isDragging })
  const cards = props.cards.map(id => cardsIndex[id])
  const shouldRenderHeader =
    typeof props.withHeader === 'undefined'
      ? props.name || props.isEditable
      : props.withHeader

  return (
    <Spacing bottom='LARGE'>
      <div style={{ '--color': props.color }}>
        {shouldRenderHeader && (
          <ListBuilderTierHeader {...props} cards={cards} />
        )}

        <div className={css(styles.body)} onMouseUp={props.onMouseUp}>
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
            <p className={css(styles.empty)}>
              There are currently no cards in this tier.{' '}
              {props.isEditable &&
                'Try adding a card to it to have it displayed here.'}
            </p>
          )}
        </div>
      </div>
    </Spacing>
  )
})
