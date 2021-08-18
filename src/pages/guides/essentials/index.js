import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'

const GuidesPage = () => (
  <Layout active={['GUIDES', 'ESSENTIALS']}>
    <Guides category='ESSENTIALS' />
  </Layout>
)

export default GuidesPage
