import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const StoriesPage = props => (
  <Layout active={['STORIES']} navigation={props.navigation}>
    <StoryIndex />
  </Layout>
)

export default StoriesPage
