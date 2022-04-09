import PageFanKitAvatars from '~/components/PageFanKitAvatars'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getAvatars from '~/api/avatars/getAvatars'

export async function getStaticProps({ preview: isPreview = false }) {
  const avatars = await getAvatars({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      avatars,
      settings,
      breadcrumbs: ['GAME', 'INFORMATION', 'FAN_KIT'],
    },
  }
}

export default PageFanKitAvatars
