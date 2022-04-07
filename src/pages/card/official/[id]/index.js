import React from 'react'
import OfficialCardPage from '~/components/OfficialCardPage'
import Layout from '~/components/Layout'
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
  const cards = await getCards({
    isPreview,
    fields: '"ref": _id, ' + CARD_FIELDS,
  })
  const settings = await getSiteSettings({ isPreview, cards })
  const cardId = params.id
  const cardsIndex = indexArray(settings.cards)
  const isOfficial = cardId in cardsIndex

  if (!isOfficial) {
    return { notFound: true }
  }

  const card = getInitialCardData(settings.cards, cardId)
  const versions = await getChangesFromCard({ id: cardId, isPreview })
  const feed = await getCardFeed({
    params: { name: card.name, ref: cardsIndex[cardId].ref },
    isPreview,
  })

  return {
    props: { settings, cardId, card, versions, feed },
  }
}

const CardBuilderPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'CARDS']} settings={settings}>
    <OfficialCardPage {...props} />
  </Layout>
)

export default CardBuilderPage
