import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const HeroScoreCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'HERO_CALCULATOR']}
    navigation={navigation}
    cards={cards}
  >
    <HeroScoreCalculator {...props} />
  </Layout>
)

export default HeroScoreCalculatorPage
