import BrewedSages from '~/components/BrewedSages'
import getPodcasts from '~/api/podcasts/getPodcasts'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const episodes = await getPodcasts({ isPreview })

  return {
    props: {
      settings,
      episodes,
      breadcrumbs: ['COMMUNITY', 'DISCOVER', 'BREWED_SAGES'],
    },
  }
}

export default BrewedSages
