import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getCollectionCost from '~/helpers/getCollectionCost'

const asCollectionItem = card => ({ id: card.id, level: 5, copies: 0 })

export async function getStaticProps() {
  const cards = CARDS.filter(card => !card.token)
  const maxCollectionCost = getCollectionCost(cards.map(asCollectionItem))

  return { props: { maxCollectionCost } }
}

const CollectionStatsPage = props => (
  <Layout active={['TOOLS', 'COLLECTION_STATS']}>
    <CollectionStats maxCollectionCost={props.maxCollectionCost} />
  </Layout>
)

export default CollectionStatsPage
