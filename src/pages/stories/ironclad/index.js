import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'
import { STORY_CATEGORIES } from '~/constants/stories'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getStoriesFromCategory from '~/api/stories/getStoriesFromCategory'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'ironclad'
  const stories = await getStoriesFromCategory({ category: name, isPreview })
  const category = { ...STORY_CATEGORIES[name], id: name }
  const settings = await getSiteSettings({ isPreview })

  return { props: { category, settings, stories } }
}

const StoriesPage = ({ settings, ...props }) => (
  <Layout
    active={['STORIES', 'FACTIONS', props.category.id]}
    settings={settings}
  >
    <StoryCategory {...props} />
  </Layout>
)

export default StoriesPage
