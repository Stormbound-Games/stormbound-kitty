import React from 'react'
import Guides from '~/components/Guides'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GUIDES', 'ESSENTIALS']}>
    <Guides category='ESSENTIALS' />
  </Layout>
)
