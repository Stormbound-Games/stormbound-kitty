import React from 'react'
import Story from '~/components/Story'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getStory from '~/api/stories/getStory'
import getStories from '~/api/stories/getStories'
import getStoriesFromAuthor from '~/api/stories/getStoriesFromAuthor'
import { STORY_CATEGORIES } from '~/constants/stories'
import CARDS from '~/data/cards'

export async function getStaticPaths({ preview: isPreview = false }) {
  const stories = await getStories({ isPreview })
  const paths = stories.map(story => ({ params: { slug: story.slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = CARDS
  const story = await getStory({ slug: params.slug, isPreview })
  const moreStories = (
    await getStoriesFromAuthor({ author: story.author, isPreview })
  ).filter(story => (story.saga ? story.saga === story.saga : true))

  if (story.saga) {
    moreStories.sort((a, b) => {
      const indexA = parseInt(a.title, 10)
      const indexB = parseInt(b.title, 10)

      return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
    })
  }
  const { category } = story
  const active = ['STORIES', STORY_CATEGORIES[category].category, category]
  const navigation = await getNavigation({ isPreview })

  return {
    props: {
      active,
      cards,
      moreStories: moreStories.slice(0, 3),
      story,
      navigation,
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const StoryPage = ({ active, navigation, cards, ...props }) => (
  <Layout active={active} navigation={navigation} cards={cards}>
    <Story {...props} />
  </Layout>
)

export default StoryPage
