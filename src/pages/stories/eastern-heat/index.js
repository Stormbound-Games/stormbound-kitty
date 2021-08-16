import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'eastern-heat']}>
    <StoryCategory category='eastern-heat' />
  </Layout>
)

export default StoriesPage
