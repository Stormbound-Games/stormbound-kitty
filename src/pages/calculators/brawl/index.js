import React from 'react'
import BrawlCalculator from '~/components/BrawlCalculator'
import Layout from '~/components/Layout'

const BrawlCalculatorPage = () => (
  <Layout active={['TOOLS', 'BRAWL_CALCULATOR']}>
    <BrawlCalculator />
  </Layout>
)

export default BrawlCalculatorPage
