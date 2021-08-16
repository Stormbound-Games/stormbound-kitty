import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'

const ValueCalculatorPage = () => (
  <Layout active={['TOOLS', 'VALUE_CALCULATOR']}>
    <ValueCalculator
      cards={[
        { id: null, level: 1 },
        { id: null, level: 1 },
      ]}
    />
  </Layout>
)

export default ValueCalculatorPage
