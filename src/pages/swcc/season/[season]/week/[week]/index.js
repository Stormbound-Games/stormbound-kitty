import PageSWCCCard from '~/components/PageSWCCCard'
import getSWCCSeason from '~/api/swcc/getSWCCSeason'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getInitialCardData from '~/helpers/getInitialCardData'

export async function getStaticPaths() {
  const seasons = await getSWCCSeasons()
  const paths = seasons.flatMap(season =>
    season.weeks.map(week => ({
      params: { season: String(season.season), week: String(week.week) },
    }))
  )

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const seasonNumber = Number(params.season)
  const weekNumber = Number(params.week)
  const settings = await getSiteSettings({ isPreview })
  const season = await getSWCCSeason({ number: seasonNumber, isPreview })

  if (!season || season.length === 0) {
    return { notFound: true }
  }

  const week = season.find(week => week.week === weekNumber)

  if (!week) {
    return { notFound: true }
  }

  const card = getInitialCardData(settings.cards, week.winner.id)

  return {
    props: {
      settings,
      contest: week,
      card,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'CARD_CONTEST'],
    },
  }
}

export default PageSWCCCard
