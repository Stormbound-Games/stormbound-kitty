import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['STORIES']}>
    <StoryIndex />
  </Layout>
)
