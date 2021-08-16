import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'

const CardContestPage = () => (
  <Layout active={['COMMUNITY', 'CARD_CONTEST']}>
    <CardBuilderContest />
  </Layout>
)

export default CardContestPage
