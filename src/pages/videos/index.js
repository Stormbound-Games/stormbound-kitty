import React from 'react'
import YouTubeChannels from '~/components/YouTubeChannels'
import Layout from '~/components/Layout'
import getChannels from '~/api/channels/getChannels'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const channels = await getChannels({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, channels, navigation },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const YouTubeChannelsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'YOUTUBE_CHANNELS']}
    navigation={navigation}
  >
    <YouTubeChannels {...props} />
  </Layout>
)

export default YouTubeChannelsPage
