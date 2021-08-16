import React from 'react'
import BrawlCalculator from '~/components/BrawlCalculator'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'BRAWL_CALCULATOR']}>
    <BrawlCalculator />
  </Layout>
)
