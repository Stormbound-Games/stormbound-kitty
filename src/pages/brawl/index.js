import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'

const BrawlIndexPage = () => (
  <Layout active={['TOOLS', 'BRAWL', 'INDEX']}>
    <BrawlIndex />
  </Layout>
)

export default BrawlIndexPage
