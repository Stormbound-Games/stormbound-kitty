import React from 'react'
import Releases from '../../components/Releases'
import Layout from '../../components/Layout'

export default () => (
  <Layout active={['GAME', 'RELEASES']}>
    <Releases />
  </Layout>
)
