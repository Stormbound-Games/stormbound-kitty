import React from 'react'
import Videos from '~/components/Videos'
import Layout from '~/components/Layout'
import CHANNELS from '~/data/channels'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { channels: CHANNELS, navigation: getNavigation() } }
}

const VideosPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'VIDEOS']} navigation={navigation}>
    <Videos {...props} />
  </Layout>
)

export default VideosPage
