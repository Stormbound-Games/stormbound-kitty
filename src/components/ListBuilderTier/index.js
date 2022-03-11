import React from 'react'
import { Reorder } from 'framer-motion'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import ListBuilderTierHeader from '~/components/ListBuilderTierHeader'
import ListBuilderTierItem from '~/components/ListBuilderTierItem'
import Spacing from '~/components/Spacing'
import styles from './styles'

export default React.memo(function ListBuilderTier(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { css } = useFela()
  const shouldRenderHeader =
    typeof props.withHeader === 'undefined'
      ? props.name || props.isEditable
      : props.withHeader

  return (
    <Spacing bottom='LARGE'>
      {shouldRenderHeader && (
        <ListBuilderTierHeader {...props} cards={props.cards} />
      )}

      {props.cards.length > 0 ? (
        <>
          {props.isEditable ? (
            <Reorder.Group
              values={props.cards}
              onReorder={props.reorderCards}
              className={css(styles.list)}
            >
              {props.cards.map(cardId => (
                <ListBuilderTierItem
                  {...cardsIndex[cardId]}
                  key={cardId}
                  removeCard={props.removeCard}
                  isEditable
                />
              ))}
            </Reorder.Group>
          ) : (
            <ul className={css(styles.list)}>
              {props.cards.map(cardId => (
                <ListBuilderTierItem {...cardsIndex[cardId]} key={cardId} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className={css(styles.empty)}>
          There are currently no cards in this tier.{' '}
          {props.isEditable &&
            'Try adding a card to it to have it displayed here.'}
        </p>
      )}
    </Spacing>
  )
})
