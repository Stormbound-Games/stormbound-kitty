import PageOfficialCard from '~/components/PageOfficialCard'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getChangesFromCard from '~/api/changes/getChangesFromCard'
import getCards from '~/api/cards/getCards'
import getCardFeed from '~/api/cards/getCardFeed'
import { FIELDS as CARD_FIELDS } from '~/api/cards/utils'

export async function getStaticPaths() {
  const cards = (await getCards()).filter(card => !card.token)
  const paths = cards.map(card => ({ params: { id: card.id } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cardId = params.id.toUpperCase()
  const cards = await getCards({
    isPreview,
    fields: CARD_FIELDS + ', id.current == $id => { _id, notes }',
    params: { id: cardId },
  })
  const settings = await getSiteSettings({ isPreview, cards })
  const cardsIndex = indexArray(settings.cards)
  const isOfficial = cardId in cardsIndex

  if (!isOfficial || cardsIndex[cardId].token) {
    return { notFound: true }
  }

  const notes = cardsIndex[cardId].notes || null
  const sanityId = cardsIndex[cardId]._id || null

  // Delete additional fields for the current card as they should not be carried
  // away in the context as they are unnecessary throughout the codebase except
  // for the official card page.
  delete cardsIndex[cardId].notes
  delete cardsIndex[cardId]._id

  const card = getInitialCardData(settings.cards, cardId)
  const versions = await getChangesFromCard({ id: cardId, isPreview })
  const feed = await getCardFeed({
    params: { name: card.name, ref: sanityId },
    isPreview,
  })

  return {
    props: {
      settings,
      id: cardId,
      card,
      versions,
      feed,
      notes,
      breadcrumbs: ['GAME', 'INFORMATION', 'CARDS'],
    },
  }
}

export default PageOfficialCard
