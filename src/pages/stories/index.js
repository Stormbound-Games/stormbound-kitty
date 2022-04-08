import StoryIndex from '~/components/StoryIndex'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings, breadcrumbs: ['STORIES'] } }
}

export default StoryIndex
