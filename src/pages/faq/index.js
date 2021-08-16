import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'

const FAQPage = () => (
  <Layout active={['HOME', 'FAQ']}>
    <FAQ />
  </Layout>
)

export default FAQPage
