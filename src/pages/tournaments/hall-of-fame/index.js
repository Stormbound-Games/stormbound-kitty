import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'
import TOURNAMENTS from '~/data/tournaments'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { tournaments: TOURNAMENTS, navigation: getNavigation() } }
}

const TournamentHallOfFamePage = props => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'HALL_OF_FAME']}
    navigation={props.navigation}
  >
    <TournamentHallOfFame tournaments={props.tournaments} />
  </Layout>
)

export default TournamentHallOfFamePage
