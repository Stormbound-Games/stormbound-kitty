import PageStoryCategory from '~/components/PageStoryCategory'
import { STORY_CATEGORIES } from '~/constants/stories'
import getSiteSettings from '~/api/misc/getSiteSettings'
import sortSaga from '~/helpers/sortSaga'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'eastern-heat'
  const stories = (
    await getStoriesFromCategory({ category: name, isPreview })
  ).sort(sortSaga)
  const settings = await getSiteSettings({ isPreview })
  const category = { ...STORY_CATEGORIES[name], id: name }

  return {
    props: {
      category,
      settings,
      stories,
      isSaga: true,
      breadcrumbs: ['STORIES', 'SAGAS', category.id],
    },
  }
}

export default PageStoryCategory
