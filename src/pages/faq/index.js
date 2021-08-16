import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['HOME', 'FAQ']}>
    <FAQ />
  </Layout>
)
