import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['STORIES', 'ironclad']}>
    <StoryCategory category='ironclad' />
  </Layout>
)
