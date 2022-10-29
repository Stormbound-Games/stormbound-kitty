import PageLeagueList from '#components/PageLeagueList'
import getLeagueTierList from '#api/lists/getLeagueTierList'
import getSiteSettings from '#api/misc/getSiteSettings'
import getInitialListData from '#helpers/getInitialListData'
import { LEAGUES } from '#constants/game'

export async function getStaticPaths() {
  return {
    paths: LEAGUES.map(league => ({ params: { league } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const { league } = params
  const breadcrumbs = ['COMMUNITY', 'META', 'TIER_LISTS']

  if (!LEAGUES.includes(league)) {
    return { notFound: true }
  }

  try {
    const tierList = await getLeagueTierList({
      isPreview,
      league: league.toUpperCase(),
      cards: settings.cards,
    })
    const tiers = getInitialListData(tierList)

    return {
      props: { league, settings, tiers, breadcrumbs },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.error(err)
    const error = { type: err.type, name: err.name }

    return {
      props: { league, settings, tiers: [], error, breadcrumbs },
      revalidate: 60 * 60 * 24,
    }
  }
}

export default PageLeagueList
