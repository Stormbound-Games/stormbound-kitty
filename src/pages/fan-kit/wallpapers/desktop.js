import PageFanKitWallpapersDesktop from '~/components/PageFanKitWallpapersDesktop'
import getWallpapersFromType from '~/api/wallpapers/getWallpapersFromType'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const wallpapers = await getWallpapersFromType({ type: 'DESKTOP', isPreview })

  return {
    props: {
      settings,
      wallpapers,
      breadcrumbs: ['GAME', 'INFORMATION', 'FAN_KIT'],
    },
  }
}

export default PageFanKitWallpapersDesktop
