import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const category = 'lore'
  const stories = await getStoriesFromCategory({ category, isPreview })

  return {
    props: {
      navigation: getNavigation(),
      stories,
      category: { ...STORY_CATEGORIES[category], id: category },
    },
  }
}

const StoriesPage = ({ navigation, ...props }) => (
  <Layout
    active={['STORIES', 'GENERAL', props.category.id]}
    navigation={navigation}
  >
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
