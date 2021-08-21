import React from 'react'
import CardBuilderContest from '~/components/CardBuilderContest'
import Layout from '~/components/Layout'
import SWCC from '~/data/swcc'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), seasons: SWCC } }
}

const CardContestPage = props => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'CARD_CONTEST']}
    navigation={props.navigation}
  >
    <CardBuilderContest seasons={props.seasons} />
  </Layout>
)

export default CardContestPage
