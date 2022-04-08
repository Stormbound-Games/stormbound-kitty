import Collection from '~/components/Collection'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      settings,
      breadcrumbs: ['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION'],
    },
  }
}

export default Collection
