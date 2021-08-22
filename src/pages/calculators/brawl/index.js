import React from 'react'
import BrawlCalculator from '~/components/BrawlCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const BrawlCalculatorPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BRAWL_CALCULATOR']}
    navigation={navigation}
  >
    <BrawlCalculator {...props} />
  </Layout>
)

export default BrawlCalculatorPage
