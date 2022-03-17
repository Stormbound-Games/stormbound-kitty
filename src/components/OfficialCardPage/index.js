import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardChangeFeed from '~/components/CardChangeFeed'
import CardCommunityFeed from '~/components/CardCommunityFeed'
import CardDisplay from '~/components/CardDisplay'
import CardDisplayControls from '~/components/CardDisplayControls'
import Page from '~/components/Page'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import { formatPreciseDate } from '~/helpers/formatDate'
import formatCardStats from '~/helpers/formatCardStats'
import useVersionedCardData from './useVersionedCardData'
import getWikiCardLink from '~/helpers/getWikiCardLink'

export default React.memo(function OfficialCardPage(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { cardId } = props
  const versionId = Number(props.versionId)
  const cardData = useVersionedCardData(props)
  const date = formatPreciseDate(versionId)
  const meta = [
    cardData.rarity,
    cardData.faction,
    cardData.race,
    cardData.type,
    date ? 'Prior ' + date : null,
  ]
    .filter(Boolean)
    .join(' · ')
  const { image } = cardsIndex[cardData.imageCardId]

  return (
    <Page
      meta={meta}
      metaTitle={versionId ? cardData.name + ' (prior ' + date + ')' : null}
      title={cardData.name}
      description={formatCardStats(cardData)}
      image={image}
      action={{
        href: getWikiCardLink(cardData.name),
        children: 'Open in wiki',
      }}
    >
      <Spacing bottom='LARGEST'>
        <CardDisplay mode='DISPLAY' {...cardData} id={cardId} />
      </Spacing>

      <Spacing bottom='LARGEST'>
        <CardDisplayControls id={cardId} />
      </Spacing>

      {props.feed.length ? (
        <Row isDesktopOnly>
          <Row.Column>
            <CardChangeFeed
              id={props.cardId}
              versionId={versionId}
              changes={props.versions}
            />
          </Row.Column>
          <Row.Column>
            <CardCommunityFeed id={props.cardId} feed={props.feed} />
          </Row.Column>
        </Row>
      ) : (
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
