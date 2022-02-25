import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import sortSaga from '~/helpers/sortSaga'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const category = 'eastern-heat'
  const stories = (await getStoriesFromCategory({ category, isPreview })).sort(
    sortSaga
  )

  return {
    props: {
      stories,
      category: { ...STORY_CATEGORIES[category], id: category },
      navigation: await getNavigation({ isPreview }),
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const StoriesPage = ({ navigation, ...props }) => (
  <Layout
    active={['STORIES', 'SAGAS', props.category.id]}
    navigation={navigation}
  >
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
