import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'RANKED_LIST']}>
    <RankedList />
  </Layout>
)
