import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'
import getCollectionCost from '~/helpers/getCollectionCost'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

const asCollectionItem = card => ({ id: card.id, level: 5, copies: 0 })

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const cardsIndex = indexArray(cards)
  const maxCollectionCost = getCollectionCost(
    cardsIndex,
    cards.filter(card => !card.token).map(asCollectionItem)
  )
  const settings = await getSiteSettings({ isPreview })

  return { props: { cards, settings, maxCollectionCost } }
}

const CollectionStatsPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION_STATS']}
    settings={settings}
  >
    <CollectionStats {...props} />
  </Layout>
)

export default CollectionStatsPage
