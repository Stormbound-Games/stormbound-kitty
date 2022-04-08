import FanArt from '~/components/FanArt'
import getArtworks from '~/api/artworks/getArtworks'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const artworks = await getArtworks({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      artworks,
      settings,
      breadcrumbs: ['COMMUNITY', 'DISCOVER', 'FAN_ART'],
    },
  }
}

export default FanArt
