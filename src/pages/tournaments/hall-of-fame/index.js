import React from 'react'
import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import Layout from '~/components/Layout'
import getTournaments from '~/api/tournaments/getTournaments'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const tournaments = await getTournaments({ isPreview })

  return {
    props: { cards, settings, tournaments },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const TournamentHallOfFamePage = ({ settings, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'CONTESTS', 'HALL_OF_FAME']}
    settings={settings}
  >
    <TournamentHallOfFame {...props} />
  </Layout>
)

export default TournamentHallOfFamePage
