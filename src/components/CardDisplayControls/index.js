import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import CardProgress from '~/components/CardProgress'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import sortCards from '~/helpers/sortCards'
import styles from './styles'

const sortCollection = cardsIndex => (a, b) =>
  sortCards()(
    getResolvedCardData(cardsIndex, a),
    getResolvedCardData(cardsIndex, b)
  )

export default React.memo(function CardDisplayControls(props) {
  const { css } = useFela()
  const { id } = props
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)
  const orderedCollection = React.useMemo(
    () => collection.sort(sortCollection(cardsIndex)),
    [cardsIndex, collection]
  )

  const indexInCollection = orderedCollection.findIndex(card => card.id === id)
  const cardInCollection = orderedCollection[indexInCollection]
  const nextCard = cardInCollection && orderedCollection[indexInCollection + 1]
  const previousCard =
    cardInCollection && orderedCollection[indexInCollection - 1]

  return (
    <div className={css(styles.container)}>
      <div>
        <CTA
          disabled={!previousCard}
          to={previousCard ? `/card/${previousCard.id}/display` : undefined}
          scroll={false}
          data-testid='prev-btn'
        >
          Previous card
        </CTA>
      </div>

      {cardInCollection && (
        <Only.CustomCollection>
          <div className={css(styles.collection)}>
            <CardProgress card={cardInCollection} />
          </div>
        </Only.CustomCollection>
      )}

      <div>
        <CTA
          disabled={!nextCard}
          to={nextCard ? `/card/${nextCard.id}/display` : undefined}
          scroll={false}
          data-testid='next-btn'
        >
          Next card
        </CTA>
      </div>
    </div>
  )
})
