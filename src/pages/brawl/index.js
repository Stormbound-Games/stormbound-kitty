import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'BRAWL', 'INDEX']}>
    <BrawlIndex />
  </Layout>
)
