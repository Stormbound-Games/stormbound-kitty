import React from 'react'
import StoryCategory from '~/components/StoryCategory'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['STORIES', 'eastern-heat']}>
    <StoryCategory category='eastern-heat' />
  </Layout>
)
