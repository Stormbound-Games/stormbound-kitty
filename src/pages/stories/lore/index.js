import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'lore']}>
    <StoryCategory category='lore' />
  </Layout>
)

export default StoriesPage
