import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const HeroScoreCalculatorPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'HERO_CALCULATOR']}
    navigation={navigation}
  >
    <HeroScoreCalculator {...props} />
  </Layout>
)

export default HeroScoreCalculatorPage
