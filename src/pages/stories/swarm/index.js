import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['STORIES', 'swarm']}>
    <StoryCategory category='swarm' />
  </Layout>
)
