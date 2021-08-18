import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES']}>
    <StoryIndex />
  </Layout>
)

export default StoriesPage
