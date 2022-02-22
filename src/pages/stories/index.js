import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const StoriesPage = ({ navigation, ...props }) => (
  <Layout active={['STORIES']} navigation={navigation}>
    <StoryIndex {...props} />
  </Layout>
)

export default StoriesPage
