import React from 'react'
import CardChangelog from '../../components/CardChangelog'
import Layout from '../../components/Layout'

export default () => (
  <Layout active={['GAME', 'CARD_CHANGELOG']}>
    <CardChangelog />
  </Layout>
)
