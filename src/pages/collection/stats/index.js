import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'
import getCollectionCost from '~/helpers/getCollectionCost'
import getNavigation from '~/helpers/getNavigation'
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
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation, maxCollectionCost } }
}

const CollectionStatsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION_STATS']}
    navigation={navigation}
  >
    <CollectionStats {...props} />
  </Layout>
)

export default CollectionStatsPage
