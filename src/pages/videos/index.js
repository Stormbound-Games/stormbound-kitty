import React from 'react'
import Videos from '~/components/Videos'
import Layout from '~/components/Layout'
import getChannels from '~/api/channels/getChannels'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return {
    props: {
      channels: await getChannels(),
      navigation: getNavigation(),
    },
  }
}

const VideosPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'VIDEOS']} navigation={navigation}>
    <Videos {...props} />
  </Layout>
)

export default VideosPage
