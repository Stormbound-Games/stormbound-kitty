import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

const StoriesPage = () => (
  <Layout active={['STORIES', 'ironclad']}>
    <StoryCategory category='ironclad' />
  </Layout>
)

export default StoriesPage
