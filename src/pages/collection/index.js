import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'

const CollectionPage = () => (
  <Layout active={['TOOLS', 'COLLECTION']}>
    <Collection />
  </Layout>
)

export default CollectionPage
