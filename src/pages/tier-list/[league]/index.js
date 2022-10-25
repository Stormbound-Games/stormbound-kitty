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

  if (!LEAGUES.includes(league)) {
    return { notFound: true }
  }

  const tierList = await getLeagueTierList({
    isPreview,
    league: league.toUpperCase(),
    cards: cards.settings,
  })

  return {
    props: {
      league,
      settings,
      tiers: getInitialListData(tierList),
      breadcrumbs: ['COMMUNITY', 'META', 'TIER_LISTS'],
    },
    revalidate: 60 * 60 * 24,
  }
}

export default PageLeagueList
