import Releases from '~/components/Releases'
import getReleases from '~/api/releases/getReleases'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const releases = await getReleases({ isPreview })
  const cardIds = releases.map(release => release.cardId)

  return {
    props: {
      settings,
      releases,
      breadcrumbs: ['GAME', 'UPDATES', 'RELEASES'],
    },
  }
}

export default Releases
