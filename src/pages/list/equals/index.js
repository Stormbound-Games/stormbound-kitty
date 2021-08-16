import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'

const EqualsListPage = () => (
  <Layout active={['COMMUNITY', 'EQUALS_LIST']}>
    <EqualsList />
  </Layout>
)

export default EqualsListPage
