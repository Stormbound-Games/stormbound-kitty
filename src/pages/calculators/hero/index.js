import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'

const HeroScoreCalculatorPage = () => (
  <Layout active={['TOOLS', 'HERO_CALCULATOR']}>
    <HeroScoreCalculator />
  </Layout>
)

export default HeroScoreCalculatorPage
