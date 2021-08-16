import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'

const ReleasesPage = () => (
  <Layout active={['GAME', 'RELEASES']}>
    <Releases />
  </Layout>
)

export default ReleasesPage
