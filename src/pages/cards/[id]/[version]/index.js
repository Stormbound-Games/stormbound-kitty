import PageOfficialCard from '~/components/PageOfficialCard'
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
    fields: '"ref": _id, notes, ' + CARD_FIELDS,
  })
  const settings = await getSiteSettings({ isPreview, cards })
  const cardId = params.id.toUpperCase()
  const versionId = params.version
  const cardsIndex = indexArray(settings.cards)
  const isOfficial = cardId in cardsIndex

  if (!isOfficial || cardsIndex[cardId].token) {
    return { notFound: true }
  }

  const notes = cardsIndex[cardId].notes || null

  // Cards notes should not be carried away in the context as they are
  // unnecessary throughout the codebase except for the official card page.
  settings.cards.forEach(card => {
    delete card.notes
  })

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
      id: cardId,
      card,
      versionId,
      versions,
      feed,
      notes,
      breadcrumbs: ['GAME', 'INFORMATION', 'CARDS'],
    },
  }
}

export default PageOfficialCard
