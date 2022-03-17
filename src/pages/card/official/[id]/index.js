import React from 'react'
import OfficialCardPage from '~/components/OfficialCardPage'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getChangesFromCard from '~/api/changes/getChangesFromCard'
import getCards from '~/api/cards/getCards'
import getCardFeed from '~/api/cards/getCardFeed'

export async function getStaticPaths() {
  const cards = (await getCards()).filter(card => !card.token)
  const paths = cards.map(card => ({ params: { id: card.id } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const cardId = params.id
  const isOfficial = cardId in indexArray(settings.cards)

  if (!isOfficial) {
    return { notFound: true }
  }

  const card = getInitialCardData(settings.cards, cardId)
  const versions = await getChangesFromCard({ id: cardId, isPreview })
  const feed = await getCardFeed({ id: cardId, isPreview })

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
