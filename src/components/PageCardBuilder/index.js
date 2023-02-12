import React from 'react'
import { CardsContext } from '#components/CardsProvider'
import CardDisplay from '#components/CardDisplay'
import RandomCardInfo from '#components/RandomCardInfo'
import Page from '#components/Page'
import CoreForm from '#components/CardBuilderCoreForm'
import Notice from '#components/Notice'
import LevelForm from '#components/CardBuilderLevelForm'
import Spacing from '#components/Spacing'
import Title from '#components/Title'
import getCardBuilderMetaTags from '#helpers/getCardBuilderMetaTags'
import useCardBuilder from '#hooks/useCardBuilder'
import useRouteId from '#hooks/useRouteId'

const usePageProps = (props, card) => {
  const id = useRouteId()

  if (!id) return {}

  const isEditing = props.mode === 'EDITOR'
  const { rarity, faction, type, unitTypes } = card
  const to = `/card/${id}` + (isEditing ? '/display' : '')
  const label = isEditing ? 'Display view' : 'Edit card'
  const icon = isEditing ? 'eye' : undefined

  return {
    meta: [rarity, faction, unitTypes.join(' '), type]
      .filter(Boolean)
      .join(' · '),
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
        <CardDisplay {...card} mode={props.mode} />

        {card.hasSingleLevel && (
          <Notice icon='hammer'>
            This card was created before it was possible to define all 5 levels,
            or without consideration for leveling, therefore only the level{' '}
            {props.level} is relevant.
          </Notice>
        )}
      </Spacing>

      {props.mode === 'EDITOR' && (
        <Page.Narrow>
          <RandomCardInfo setCardData={setters.setCardData} />

          <form onSubmit={event => event.preventDefault()}>
            <Spacing vertical='LARGE'>
              <Title>Core attributes</Title>
              <CoreForm {...card} {...setters} />
            </Spacing>
            <Spacing vertical='LARGE'>
              <Title>Level-specific attributes</Title>
              <LevelForm {...card} {...setters} />
            </Spacing>
          </form>
        </Page.Narrow>
      )}
    </Page>
  )
})
