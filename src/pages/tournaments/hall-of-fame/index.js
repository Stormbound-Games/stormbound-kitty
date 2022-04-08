import TournamentHallOfFame from '~/components/TournamentHallOfFame'
import getTournaments from '~/api/tournaments/getTournaments'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const tournaments = await getTournaments({ isPreview })

  return {
    props: {
      settings,
      tournaments,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'HALL_OF_FAME'],
    },
  }
}

export default TournamentHallOfFame
