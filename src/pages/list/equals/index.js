import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'EQUALS_LIST']}>
    <EqualsList />
  </Layout>
)
