import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'shadowfen']}>
    <StoryCategory category='shadowfen' />
  </Layout>
)

export default StoriesPage
