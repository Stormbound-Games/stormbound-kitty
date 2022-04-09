import PageStoryCategory from '~/components/PageStoryCategory'
import { STORY_CATEGORIES } from '~/constants/stories'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'winter'
  const stories = await getStoriesFromCategory({ category: name, isPreview })
  const category = { ...STORY_CATEGORIES[name], id: name }
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      category,
      settings,
      stories,
      breadcrumbs: ['STORIES', 'FACTIONS', category.id],
    },
  }
}

export default PageStoryCategory
