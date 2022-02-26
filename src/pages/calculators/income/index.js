import React from 'react'
import IncomeCalculator from '~/components/IncomeCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const IncomeCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'INCOME_CALCULATOR']}
    navigation={navigation}
    cards={cards}
  >
    <IncomeCalculator {...props} />
  </Layout>
)

export default IncomeCalculatorPage
