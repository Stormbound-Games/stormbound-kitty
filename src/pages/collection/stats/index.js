import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getCollectionCost from '~/helpers/getCollectionCost'
import getNavigation from '~/helpers/getNavigation'

const asCollectionItem = card => ({ id: card.id, level: 5, copies: 0 })

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = CARDS.filter(card => !card.token)
  const maxCollectionCost = getCollectionCost(cards.map(asCollectionItem))

  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      maxCollectionCost,
    },
  }
}

const CollectionStatsPage = ({ navigation, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION_STATS']}
    navigation={navigation}
  >
    <CollectionStats {...props} />
  </Layout>
)

export default CollectionStatsPage
