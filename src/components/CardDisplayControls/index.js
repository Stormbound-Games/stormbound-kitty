import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import CardProgress from '../CardProgress'
import Column from '../Column'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'

const CardDisplayControls = props => {
  const match = useRouteMatch()
  const { cardId } = match.params
  const { collection, hasDefaultCollection } = React.useContext(
    CollectionContext
  )
  const cardInCollection = collection.find(card => card.id === cardId)

  if (hasDefaultCollection || !cardInCollection) return null

  const indexInCollection = collection.findIndex(card => card.id === cardId)
  const nextCard = collection[indexInCollection + 1]
  const previousCard = collection[indexInCollection - 1]

  return (
    <Only.Desktop>
      <Row>
        <Column width={20} style={{ justifyContent: 'center' }}>
          {previousCard && (
            <CTA to={`/card/${previousCard.id}/display`}>Previous</CTA>
          )}
        </Column>
        <Column width={20} />
        <Column width={20}>
          <CardProgress card={cardInCollection} />
        </Column>
        <Column width={20} />
        <Column width={20} style={{ justifyContent: 'center' }}>
          {nextCard && <CTA to={`/card/${nextCard.id}/display`}>Next</CTA>}
        </Column>
      </Row>
    </Only.Desktop>
  )
}

export default CardDisplayControls
