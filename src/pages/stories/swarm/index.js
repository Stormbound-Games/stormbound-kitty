import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'swarm']}>
    <StoryCategory category='swarm' />
  </Layout>
)

export default StoriesPage
