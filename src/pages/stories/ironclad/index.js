import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const category = 'ironclad'
  const stories = await getStoriesFromCategory({ category, isPreview })

  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      stories,
      category: { ...STORY_CATEGORIES[category], id: category },
    },
    revalidate: 60 * 60 * 24 * 7,
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
