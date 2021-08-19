import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import SWCC from '~/data/swcc'

export async function getStaticProps() {
  return { props: { seasons: SWCC } }
}

const CardContestPage = props => (
  <Layout active={['COMMUNITY', 'CARD_CONTEST']}>
    <CardBuilderContest seasons={props.seasons} />
  </Layout>
)

export default CardContestPage
