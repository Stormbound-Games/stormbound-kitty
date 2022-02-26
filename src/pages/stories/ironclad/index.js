import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'ironclad'
  const cards = CARDS
  const stories = await getStoriesFromCategory({ category: name, isPreview })
  const category = { ...STORY_CATEGORIES[name], id: name }
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, category, navigation, stories },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const StoriesPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['STORIES', 'FACTIONS', props.category.id]}
    navigation={navigation}
    cards={cards}
  >
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
