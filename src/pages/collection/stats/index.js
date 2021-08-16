import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'

const CollectionStatsPage = () => (
  <Layout active={['TOOLS', 'COLLECTION_STATS']}>
    <CollectionStats />
  </Layout>
)

export default CollectionStatsPage
