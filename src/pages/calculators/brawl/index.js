import React from 'react'
import BrawlCalculator from '~/components/BrawlCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const BrawlCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BRAWL_CALCULATOR']}
    navigation={navigation}
  >
    <BrawlCalculator {...props} />
  </Layout>
)

export default BrawlCalculatorPage
