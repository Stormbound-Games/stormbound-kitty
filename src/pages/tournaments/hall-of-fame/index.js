import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'
import getTournaments from '~/api/tournaments/getTournaments'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      tournaments: await getTournaments({ isPreview }),
      navigation: await getNavigation({ isPreview }),
    },
    revalidate: 60 * 60 * 24 * 7,
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
