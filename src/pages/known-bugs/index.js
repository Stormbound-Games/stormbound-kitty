import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'

const KnownBugsPage = () => (
  <Layout active={['GAME', 'KNOWN_BUGS']}>
    <KnownBugs />
  </Layout>
)

export default KnownBugsPage
