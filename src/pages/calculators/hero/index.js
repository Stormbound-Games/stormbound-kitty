import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })

  return { props: { navigation } }
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
