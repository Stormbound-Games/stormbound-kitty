import React from 'react'
import Home from '~/components/Home'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['HOME', 'NEWS']}>
    <Home />
  </Layout>
)
