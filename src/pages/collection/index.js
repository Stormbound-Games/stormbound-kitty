import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'COLLECTION']}>
    <Collection />
  </Layout>
)
