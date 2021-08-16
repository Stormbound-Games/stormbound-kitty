import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'

const GuidesPage = () => (
  <Layout active={['GUIDES', 'PLAYSTYLE']}>
    <Guides category='PLAYSTYLE' />
  </Layout>
)

export default GuidesPage
