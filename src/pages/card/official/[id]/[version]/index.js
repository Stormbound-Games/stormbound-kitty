import OfficialCardPage from '~/components/OfficialCardPage'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getChangesFromCard from '~/api/changes/getChangesFromCard'
import getChanges from '~/api/changes/getChanges'
import getCardFeed from '~/api/cards/getCardFeed'
import getCards from '~/api/cards/getCards'
import { FIELDS as CARD_FIELDS } from '~/api/cards/utils'

export async function getStaticPaths() {
  const changes = await getChanges()
  const paths = changes.map(change => ({
    params: { id: change.id, version: String(change.timestamp) },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({
    isPreview,
    fields: '"ref": _id, ' + CARD_FIELDS,
  })
  const settings = await getSiteSettings({ isPreview, cards })
  const { id: cardId, version: versionId } = params
  const cardsIndex = indexArray(settings.cards)
  const isOfficial = cardId in cardsIndex

  if (!isOfficial) {
    return { notFound: true }
  }

  const card = getInitialCardData(settings.cards, cardId)
  const versions = await getChangesFromCard({ id: cardId, isPreview })

  if (!versions.some(v => String(v.timestamp) === versionId)) {
    return { notFound: true }
  }

  const feed = await getCardFeed({
    params: { name: card.name, ref: cardsIndex[cardId].ref },
    isPreview,
  })

  return {
    props: {
      settings,
      cardId,
      card,
      versionId,
      versions,
      feed,
      breadcrumbs: ['GAME', 'INFORMATION', 'CARDS'],
    },
  }
}

export default OfficialCardPage
