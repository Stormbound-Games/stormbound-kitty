import React from 'react'
import YouTubeChannels from '~/components/YouTubeChannels'
import Layout from '~/components/Layout'
import getChannels from '~/api/channels/getChannels'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
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
    cards={cards}
  >
    <YouTubeChannels {...props} />
  </Layout>
)

export default YouTubeChannelsPage
