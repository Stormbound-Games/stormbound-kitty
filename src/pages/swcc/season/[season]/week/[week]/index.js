import PageSWCCCard from '~/components/PageSWCCCard'
import getSWCCSeason from '~/api/swcc/getSWCCSeason'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getInitialCardData from '~/helpers/getInitialCardData'

export async function getStaticPaths() {
  const seasons = await getSWCCSeasons()
  const paths = seasons.flatMap(season =>
    season.contests.map(contest => ({
      params: { season: String(contest.season), week: String(contest.week) },
    }))
  )

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const seasonNumber = Number(params.season)
  const weekNumber = Number(params.week)
  const settings = await getSiteSettings({ isPreview })
  const contests = await getSWCCSeason({ number: seasonNumber, isPreview })

  if (!contests || contests.length === 0) {
    return { notFound: true }
  }

  const contest = contests.find(contest => contest.week === weekNumber)

  if (!contest) {
    return { notFound: true }
  }

  const card = getInitialCardData(settings.cards, contest.id)

  return {
    props: {
      settings,
      contest,
      card,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'CARD_CONTEST'],
    },
  }
}

export default PageSWCCCard
