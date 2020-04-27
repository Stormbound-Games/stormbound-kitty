import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import CardProgress from '../CardProgress'
import Column from '../Column'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import sortCards from '../../helpers/sortCards'

const sortCollection = (a, b) =>
  sortCards()(resolveCardForLevel(a), resolveCardForLevel(b))

const CardDisplayControls = React.memo(function CardDisplayControls(props) {
  const match = useRouteMatch()
  const { cardId } = match.params
  const { collection, hasDefaultCollection } = React.useContext(
    CollectionContext
  )
  const cardInCollection = collection.find(card => card.id === cardId)
  const orderedCollection = React.useMemo(
    () => collection.sort(sortCollection),
    [collection]
  )

  if (hasDefaultCollection || !cardInCollection) return null

  const indexInCollection = orderedCollection.findIndex(
    card => card.id === cardId
  )
  const nextCard = orderedCollection[indexInCollection + 1]
  const previousCard = orderedCollection[indexInCollection - 1]

  return (
    <Only.Desktop>
      <Row>
        <Column width='1/5' style={{ alignItems: 'center' }}>
          {previousCard && (
            <CTA to={`/card/${previousCard.id}/display`}>Previous card</CTA>
          )}
        </Column>
        <Column width='1/5' />
        <Column width='1/5'>
          <CardProgress card={cardInCollection} />
        </Column>
        <Column width='1/5' />
        <Column width='1/5' style={{ alignItems: 'center' }}>
          {nextCard && <CTA to={`/card/${nextCard.id}/display`}>Next card</CTA>}
        </Column>
      </Row>
    </Only.Desktop>
  )
})

export default CardDisplayControls
