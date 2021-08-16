import React from 'react'
import HeroScoreCalculator from '~/components/HeroScoreCalculator'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'HERO_CALCULATOR']}>
    <HeroScoreCalculator />
  </Layout>
)
