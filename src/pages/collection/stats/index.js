import React from 'react'
import CollectionStats from '~/components/CollectionStats'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'COLLECTION_STATS']}>
    <CollectionStats />
  </Layout>
)
