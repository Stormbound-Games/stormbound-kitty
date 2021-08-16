import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'KNOWN_BUGS']}>
    <KnownBugs />
  </Layout>
)
