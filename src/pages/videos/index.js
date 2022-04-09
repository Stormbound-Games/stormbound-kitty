import PageYouTubeChannels from '~/components/PageYouTubeChannels'
import getChannels from '~/api/users/getChannels'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const channels = await getChannels({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      channels,
      settings,
      breadcrumbs: ['COMMUNITY', 'DISCOVER', 'YOUTUBE_CHANNELS'],
    },
  }
}

export default PageYouTubeChannels
