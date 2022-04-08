import PageStoryIndex from '~/components/PageStoryIndex'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings, breadcrumbs: ['STORIES'] } }
}

export default PageStoryIndex
