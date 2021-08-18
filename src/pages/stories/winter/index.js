import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'winter']}>
    <StoryCategory category='winter' />
  </Layout>
)

export default StoriesPage
