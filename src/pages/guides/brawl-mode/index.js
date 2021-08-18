import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'

const GuidesPage = () => (
  <Layout active={['GUIDES', 'BRAWL_MODE']}>
    <Guides category='BRAWL_MODE' />
  </Layout>
)

export default GuidesPage
