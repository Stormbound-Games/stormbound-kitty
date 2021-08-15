import React from 'react'
import BrewedSages from '../../components/BrewedSages'
import Layout from '../../components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'BREWED_SAGES']}>
    <BrewedSages />
  </Layout>
)
