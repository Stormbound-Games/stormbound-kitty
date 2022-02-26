import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getNavigation from '~/helpers/getNavigation'
import sortSaga from '~/helpers/sortSaga'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'eastern-heat'
  const cards = CARDS
  const stories = (
    await getStoriesFromCategory({ category: name, isPreview })
  ).sort(sortSaga)
  const navigation = await getNavigation({ isPreview })
  const category = { ...STORY_CATEGORIES[name], id: name }

  return {
    props: { cards, category, navigation, stories },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const StoriesPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['STORIES', 'SAGAS', props.category.id]}
    navigation={navigation}
    cards={cards}
  >
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
