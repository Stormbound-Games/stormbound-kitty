import React from 'react'
import { useFela } from 'react-fela'
import { CollectionContext } from '~/components/CollectionProvider'
import CardProgress from '~/components/CardProgress'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import sortCards from '~/helpers/sortCards'
import useQueryParams from '~/hooks/useQueryParams'
import styles from './styles'

const sortCollection = (a, b) =>
  sortCards()(getResolvedCardData(a), getResolvedCardData(b))

export default React.memo(function CardDisplayControls() {
  const { css } = useFela()
  const { id: cardId } = useQueryParams()
  const { collection } = React.useContext(CollectionContext)
  const orderedCollection = React.useMemo(
    () => collection.sort(sortCollection),
    [collection]
  )

  const indexInCollection = orderedCollection.findIndex(
    card => card.id === cardId
  )
  const cardInCollection = orderedCollection[indexInCollection]
  const nextCard = cardInCollection && orderedCollection[indexInCollection + 1]
  const previousCard =
    cardInCollection && orderedCollection[indexInCollection - 1]

  return (
    <Only.Desktop>
      <div className={css(styles.container)}>
        <CTA
          disabled={!previousCard}
          to={previousCard ? `/card/${previousCard.id}/display` : undefined}
          data-testid='prev-btn'
        >
          Previous card
        </CTA>

        {cardInCollection && (
          <Only.CustomCollection>
            <CardProgress card={cardInCollection} />
          </Only.CustomCollection>
        )}

        <CTA
          disabled={!nextCard}
          to={nextCard ? `/card/${nextCard.id}/display` : undefined}
          data-testid='next-btn'
        >
          Next card
        </CTA>
      </div>
    </Only.Desktop>
  )
})
