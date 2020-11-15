import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import CardProgress from '../CardProgress'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import sortCards from '../../helpers/sortCards'

const sortCollection = (a, b) =>
  sortCards()(getResolvedCardData(a), getResolvedCardData(b))

export default React.memo(function CardDisplayControls(props) {
  const match = useRouteMatch()
  const { cardId } = match.params
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
      <Row>
        <Row.Column width='1/5' align='center'>
          {previousCard && (
            <CTA to={`/card/${previousCard.id}/display`} data-testid='prev-btn'>
              Previous card
            </CTA>
          )}
        </Row.Column>
        <Row.Column width='1/5' />
        <Row.Column width='1/5'>
          {cardInCollection && (
            <Only.CustomCollection>
              <CardProgress card={cardInCollection} />
            </Only.CustomCollection>
          )}
        </Row.Column>
        <Row.Column width='1/5' />
        <Row.Column width='1/5' align='center'>
          {nextCard && (
            <CTA to={`/card/${nextCard.id}/display`} data-testid='next-btn'>
              Next card
            </CTA>
          )}
        </Row.Column>
      </Row>
    </Only.Desktop>
  )
})
