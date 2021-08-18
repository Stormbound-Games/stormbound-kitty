import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'march-of-fauns']}>
    <StoryCategory category='march-of-fauns' />
  </Layout>
)

export default StoriesPage
