import path from 'path'
import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import generateFormulaImage from '~/helpers/generateFormulaImage'

export async function getStaticProps() {
  const formula = `S'_A = S_A + K * (W - \\frac{1}{1+10^{(S_B-S_A)/400}})`
  const filePath = path.resolve('./public/assets/images/formulas/hero.png')

  await generateFormulaImage(formula, filePath)

  return { props: { navigation: getNavigation() } }
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
