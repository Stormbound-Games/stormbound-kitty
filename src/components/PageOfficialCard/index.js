import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardChangeFeed from '~/components/CardChangeFeed'
import CardCommunityFeed from '~/components/CardCommunityFeed'
import CardDisplay from '~/components/CardDisplay'
import CardDisplayControls from '~/components/CardDisplayControls'
import CardNotes from '~/components/CardNotes'
import Page from '~/components/Page'
import Spacing from '~/components/Spacing'
import { formatPreciseDate } from '~/helpers/formatDate'
import formatCardStats from '~/helpers/formatCardStats'
import useVersionedCardData from './useVersionedCardData'
import getWikiCardLink from '~/helpers/getWikiCardLink'

export default React.memo(function PageOfficialCard(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const versionId = Number(props.versionId)
  const cardData = useVersionedCardData(props)
  const date = formatPreciseDate(versionId)
  const meta = [
    cardData.rarity,
    cardData.faction,
    cardData.unitTypes.join(' '),
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
      isEditorialContent
    >
      <Spacing bottom='LARGEST'>
        <CardDisplay mode='DISPLAY' {...cardData} id={props.id} />
      </Spacing>

      <Spacing bottom='LARGEST'>
        <CardDisplayControls id={props.id} />
      </Spacing>

      <Page.Narrow>
        <CardChangeFeed
          id={props.id}
          versionId={versionId}
          changes={props.versions}
        />
        <CardNotes id={props.id} notes={props.notes} />
        <CardCommunityFeed id={props.id} feed={props.feed} />
      </Page.Narrow>
    </Page>
  )
})
