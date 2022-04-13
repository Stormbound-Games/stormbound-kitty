import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardDisplay from '~/components/CardDisplay'
import Page from '~/components/Page'
import CoreForm from '~/components/CardBuilderCoreForm'
import Notice from '~/components/Notice'
import LevelForm from '~/components/CardBuilderLevelForm'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getCardBuilderMetaTags from '~/helpers/getCardBuilderMetaTags'
import useCardBuilder from '~/hooks/useCardBuilder'

const usePageProps = (props, card) => {
  if (!props.cardId) return {}

  const isEditing = props.mode === 'EDITOR'
  const { rarity, faction, type, race } = card
  const to = `/card/${props.cardId}` + (isEditing ? '/display' : '')
  const label = isEditing ? 'Display view' : 'Edit card'
  const icon = isEditing ? 'eye' : undefined

  return {
    meta: [rarity, faction, type, race].filter(Boolean).join(' · '),
    action: { to, children: label, icon },
  }
}

export default React.memo(function PageCardBuilder(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { card, setters } = useCardBuilder(props)
  const pageProps = usePageProps(props, card)
  const metaTags = getCardBuilderMetaTags(cardsIndex, card)

  return (
    <Page {...pageProps} {...metaTags}>
      <Spacing bottom='LARGEST'>
        <CardDisplay {...card} mode={props.mode} id={props.id} />
      </Spacing>

      {card.hasSingleLevel && (
        <Notice icon='hammer'>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Notice>
      )}

      {props.mode === 'EDITOR' && (
        <Spacing top='LARGEST'>
          <Row isDesktopOnly>
            <Row.Column>
              <Title>Core attributes</Title>
              <CoreForm {...card} {...setters} />
            </Row.Column>
            <Row.Column>
              <Title>Level-specific attributes</Title>
              <LevelForm {...card} {...setters} />
            </Row.Column>
          </Row>
        </Spacing>
      )}
    </Page>
  )
})
