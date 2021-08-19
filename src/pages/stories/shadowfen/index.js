import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import STORIES from '~/data/stories'
import { STORY_CATEGORIES } from '~/constants/stories'

export async function getStaticProps() {
  const category = 'shadowfen'
  const stories = STORIES.filter(story => story.category === category)

  return {
    props: {
      stories,
      category: { ...STORY_CATEGORIES[category], id: category },
    },
  }
}

const StoriesPage = props => (
  <Layout active={['STORIES', props.category.id]}>
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
