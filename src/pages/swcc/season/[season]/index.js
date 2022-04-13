import PageSWCCSeason from '~/components/PageSWCCSeason'
import getSWCCSeason from '~/api/swcc/getSWCCSeason'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticPaths() {
  const seasons = await getSWCCSeasons()
  const paths = seasons.map(season => ({
    params: { season: String(season.season) },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const number = Number(params.season)
  const settings = await getSiteSettings({ isPreview })
  const season = await getSWCCSeason({ number, isPreview })

  if (!season || season.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      settings,
      number,
      weeks: season,
      breadcrumbs: ['COMMUNITY', 'CONTESTS', 'CARD_CONTEST'],
    },
  }
}

export default PageSWCCSeason
