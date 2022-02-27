import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import CardChangeFeed from '~/components/CardChangeFeed'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardDisplayControls from '~/components/CardDisplayControls'
import Page from '~/components/Page'
import CoreForm from '~/components/CardBuilderCoreForm'
import Notice from '~/components/Notice'
import LevelForm from '~/components/CardBuilderLevelForm'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getCardBuilderMetaTags from '~/helpers/getCardBuilderMetaTags'
import usePageProps from './usePageProps'
import useVersionedCardData from './useVersionedCardData'

export default React.memo(function CardBuilderApp(props) {
  const { css } = useFela()
  const { cardsIndex } = React.useContext(CardsContext)
  const { cardId } = props
  const versionId = Number(props.versionId)
  const isOfficial = cardId in cardsIndex
  const cardData = useVersionedCardData(props, versionId)
  const pageProps = usePageProps(props, versionId)
  const metaTags = getCardBuilderMetaTags(cardsIndex, cardData, versionId)

  return (
    <Page {...pageProps} {...metaTags}>
      <Spacing bottom='LARGEST'>
        <CardBuilderCardDisplay mode={props.mode} {...cardData} id={cardId} />
      </Spacing>

      {isOfficial && props.mode === 'DISPLAY' && !cardData.token && (
        <Spacing bottom='LARGEST'>
          <CardDisplayControls cardId={cardId} />
        </Spacing>
      )}

      {cardData.hasSingleLevel && (
        <Notice icon='hammer'>
          This card was created before it was possible to define all 5 levels,
          or without consideration for leveling, therefore only the level{' '}
          {props.level} is relevant.
        </Notice>
      )}

      {props.mode === 'EDITOR' && (
        <Spacing top='LARGEST'>
          <div className={css({ maxWidth: '960px', margin: 'auto' })}>
            <Row isDesktopOnly>
              <Row.Column>
                <Title>Core attributes</Title>
                <CoreForm {...props} {...cardData} />
              </Row.Column>
              <Row.Column>
                <Title>Level-specific attributes</Title>
                <LevelForm {...props} {...cardData} />
              </Row.Column>
            </Row>
          </div>
        </Spacing>
      )}

      {isOfficial && !cardData.token && (
        <Page.Narrow>
          <CardChangeFeed
            id={props.cardId}
            versionId={versionId}
            changes={props.versions}
          />
        </Page.Narrow>
      )}
    </Page>
  )
})
