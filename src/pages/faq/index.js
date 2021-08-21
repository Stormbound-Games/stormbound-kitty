import React from 'react'
import FAQ from '~/components/FAQ'
import Layout from '~/components/Layout'
import data from './data'

const FAQPage = () => (
  <Layout active={['HOME', 'FAQ']}>
    <FAQ data={data} />
  </Layout>
)

export default FAQPage
