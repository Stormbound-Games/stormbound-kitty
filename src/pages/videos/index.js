import React from 'react'
import YouTubeChannels from '~/components/YouTubeChannels'
import Layout from '~/components/Layout'
import getChannels from '~/api/users/getChannels'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const channels = await getChannels({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { channels, settings },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const YouTubeChannelsPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'YOUTUBE_CHANNELS']}
    settings={settings}
  >
    <YouTubeChannels {...props} />
  </Layout>
)

export default YouTubeChannelsPage
