import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'neutral']}>
    <StoryCategory category='neutral' />
  </Layout>
)

export default StoriesPage
