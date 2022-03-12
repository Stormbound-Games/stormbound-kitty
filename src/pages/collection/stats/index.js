import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'
import getCollectionCost from '~/helpers/getCollectionCost'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'

const asCollectionItem = card => ({ id: card.id, level: 5, copies: 0 })

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(settings.cards)
  const maxCollectionCost = getCollectionCost(
    cardsIndex,
    settings.cards.filter(card => !card.token).map(asCollectionItem)
  )

  return { props: { settings, maxCollectionCost } }
}

const CollectionStatsPage = ({ settings, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION_STATS']}
    settings={settings}
  >
    <CollectionStats {...props} />
  </Layout>
)

export default CollectionStatsPage
