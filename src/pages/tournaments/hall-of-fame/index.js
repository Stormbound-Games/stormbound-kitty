import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'
import getTournaments from '~/api/tournaments/getTournaments'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })
  const tournaments = await getTournaments({ isPreview })

  return {
    props: { cards, navigation, tournaments },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const TournamentHallOfFamePage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'HALL_OF_FAME']}
    navigation={navigation}
    cards={cards}
  >
    <TournamentHallOfFame {...props} />
  </Layout>
)

export default TournamentHallOfFamePage
