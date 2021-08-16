import React from 'react'
import BrewedSages from '~/components/BrewedSages'
import Layout from '~/components/Layout'

const BrewedSagesPage = () => (
  <Layout active={['COMMUNITY', 'BREWED_SAGES']}>
    <BrewedSages />
  </Layout>
)

export default BrewedSagesPage
