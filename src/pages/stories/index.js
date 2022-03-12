import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

const StoriesPage = ({ settings, ...props }) => (
  <Layout active={['STORIES']} settings={settings}>
    <StoryIndex {...props} />
  </Layout>
)

export default StoriesPage
