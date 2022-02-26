import React from 'react'
import BrawlCalculator from '~/components/BrawlCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const BrawlCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BRAWL_CALCULATOR']}
    navigation={navigation}
    cards={cards}
  >
    <BrawlCalculator {...props} />
  </Layout>
)

export default BrawlCalculatorPage
