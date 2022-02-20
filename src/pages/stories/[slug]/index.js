import React from 'react'
import Story from '~/components/Story'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getStory from '~/api/stories/getStory'
import getStories from '~/api/stories/getStories'
import getStoriesFromAuthor from '~/api/stories/getStoriesFromAuthor'
import { STORY_CATEGORIES } from '~/constants/stories'

export async function getStaticPaths() {
  const stories = await getStories()
  const paths = stories.map(story => ({ params: { slug: story.slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const currentStory = await getStory(slug)
  const moreStories = (await getStoriesFromAuthor(currentStory.author)).filter(
    story => (currentStory.saga ? story.saga === currentStory.saga : true)
  )

  if (currentStory.saga) {
    moreStories.sort((a, b) => {
      const indexA = parseInt(a.title, 10)
      const indexB = parseInt(b.title, 10)

      return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
    })
  }
  const { category } = currentStory

  return {
    props: {
      active: ['STORIES', STORY_CATEGORIES[category].category, category],
      story: currentStory,
      moreStories: moreStories.slice(0, 3),
      navigation: getNavigation(),
    },
  }
}

const StoryPage = ({ active, navigation, ...props }) => (
  <Layout active={active} navigation={navigation}>
    <Story {...props} />
  </Layout>
)

export default StoryPage
