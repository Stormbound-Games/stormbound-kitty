import PageStatistics from '~/components/PageStatistics'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { settings, breadcrumbs: ['GAME', 'INFORMATION', 'STATISTICS'] },
  }
}

export default PageStatistics
