import PageFanKit from '#components/PageFanKit'
import getSiteSettings from '#api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { settings, breadcrumbs: ['GAME', 'INFORMATION', 'FAN_KIT'] },
  }
}

export default PageFanKit
