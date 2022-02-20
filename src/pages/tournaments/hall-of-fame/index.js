import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'
import getTournaments from '~/api/tournaments/getTournaments'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return {
    props: {
      tournaments: await getTournaments(),
      navigation: getNavigation(),
    },
  }
}

const TournamentHallOfFamePage = ({ navigation, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'HALL_OF_FAME']}
    navigation={navigation}
  >
    <TournamentHallOfFame {...props} />
  </Layout>
)

export default TournamentHallOfFamePage
