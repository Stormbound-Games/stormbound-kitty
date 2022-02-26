import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getCollectionCost from '~/helpers/getCollectionCost'
import getNavigation from '~/helpers/getNavigation'

const asCollectionItem = card => ({ id: card.id, level: 5, copies: 0 })

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = CARDS
  const maxCollectionCost = getCollectionCost(
    cards.filter(card => !card.token).map(asCollectionItem)
  )
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation, maxCollectionCost } }
}

const CollectionStatsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION_STATS']}
    navigation={navigation}
    cards={cards}
  >
    <CollectionStats {...props} />
  </Layout>
)

export default CollectionStatsPage
