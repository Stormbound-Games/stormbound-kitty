import BrawlIndex from '~/components/BrawlIndex'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBrawls from '~/api/brawls/getBrawls'

export async function getStaticProps({ preview: isPreview = false }) {
  const brawls = await getBrawls({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      brawls,
      settings,
      breadcrumbs: ['YOUR_CONTENT', 'YOUR_CONTENT', 'BRAWL_TRACKER'],
    },
  }
}

export default BrawlIndex
