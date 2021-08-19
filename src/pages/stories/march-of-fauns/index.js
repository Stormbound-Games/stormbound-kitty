import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import STORIES from '~/data/stories'
import { STORY_CATEGORIES } from '~/constants/stories'

export async function getStaticProps() {
  const category = 'march-of-fauns'
  const stories = STORIES.filter(story => story.category === category).sort(
    (a, b) => {
      const indexA = parseInt(a.title, 10)
      const indexB = parseInt(b.title, 10)

      return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
    }
  )

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
