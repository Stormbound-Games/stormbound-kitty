import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getSiteSettings from '~/api/misc/getSiteSettings'
import sortSaga from '~/helpers/sortSaga'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'march-of-fauns'
  const stories = (
    await getStoriesFromCategory({ category: name, isPreview })
  ).sort(sortSaga)
  const settings = await getSiteSettings({ isPreview })
  const category = { ...STORY_CATEGORIES[name], id: name }

  return {
    props: { category, settings, stories },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const StoriesPage = ({ settings, ...props }) => (
  <Layout active={['STORIES', 'SAGAS', props.category.id]} settings={settings}>
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
