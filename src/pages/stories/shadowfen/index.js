import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps() {
  const category = 'shadowfen'
  const stories = await getStoriesFromCategory(category)

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
    active={['STORIES', 'FACTIONS', props.category.id]}
    navigation={navigation}
  >
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
