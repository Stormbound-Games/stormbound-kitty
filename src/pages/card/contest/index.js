import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'CARD_CONTEST']}>
    <CardBuilderContest />
  </Layout>
)
