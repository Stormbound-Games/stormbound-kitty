import React from 'react'
import IncomeCalculator from '~/components/IncomeCalculator'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'INCOME_CALCULATOR']}>
    <IncomeCalculator />
  </Layout>
)
