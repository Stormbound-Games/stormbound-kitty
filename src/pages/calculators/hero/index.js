import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const HeroScoreCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'HERO_CALCULATOR']}
    navigation={navigation}
  >
    <HeroScoreCalculator {...props} />
  </Layout>
)

export default HeroScoreCalculatorPage
