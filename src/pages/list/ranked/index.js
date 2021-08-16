import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'

const RankedListPage = () => (
  <Layout active={['COMMUNITY', 'RANKED_LIST']}>
    <RankedList />
  </Layout>
)

export default RankedListPage
