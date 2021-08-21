import React from 'react'
import IncomeCalculator from '~/components/IncomeCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const IncomeCalculatorPage = props => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'INCOME_CALCULATOR']}
    navigation={props.navigation}
  >
    <IncomeCalculator />
  </Layout>
)

export default IncomeCalculatorPage
