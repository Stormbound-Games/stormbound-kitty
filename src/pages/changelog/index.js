import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'

const CardChangelogPage = () => (
  <Layout active={['GAME', 'CARD_CHANGELOG']}>
    <CardChangelog />
  </Layout>
)

export default CardChangelogPage
