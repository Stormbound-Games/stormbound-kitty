import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps() {
  const category = 'eastern-heat'
  const stories = (await getStoriesFromCategory(category))
    .filter(story => story.category === category)
    .sort((a, b) => {
      const indexA = parseInt(a.title, 10)
      const indexB = parseInt(b.title, 10)

      return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
    })

  return {
    props: {
      stories,
      category: { ...STORY_CATEGORIES[category], id: category },
      navigation: getNavigation(),
    },
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
