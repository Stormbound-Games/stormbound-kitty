import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import STORIES from '~/data/stories'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const category = 'shadowfen'
  const stories = STORIES.filter(story => story.category === category)

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
