import React from 'react'
import IncomeCalculator from '~/components/IncomeCalculator'
import Layout from '~/components/Layout'

const IncomeCalculatorPage = () => (
  <Layout active={['TOOLS', 'INCOME_CALCULATOR']}>
    <IncomeCalculator />
  </Layout>
)

export default IncomeCalculatorPage
