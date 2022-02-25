import React from 'react'
import YouTubeChannels from '~/components/YouTubeChannels'
import Layout from '~/components/Layout'
import getChannels from '~/api/channels/getChannels'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      channels: await getChannels({ isPreview }),
      navigation: await getNavigation({ isPreview }),
    },
  }
}

const YouTubeChannelsPage = ({ navigation, ...props }) => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'YOUTUBE_CHANNELS']}
    navigation={navigation}
  >
    <YouTubeChannels {...props} />
  </Layout>
)

export default YouTubeChannelsPage
