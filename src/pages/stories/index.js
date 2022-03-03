import React from 'react'
import StoryIndex from '~/components/StoryIndex'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { cards, settings } }
}

const StoriesPage = ({ settings, cards, ...props }) => (
  <Layout active={['STORIES']} settings={settings}>
    <StoryIndex {...props} />
  </Layout>
)

export default StoriesPage
