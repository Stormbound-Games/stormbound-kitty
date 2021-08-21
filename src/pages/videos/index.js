import React from 'react'
import Videos from '~/components/Videos'
import Layout from '~/components/Layout'
import CHANNELS from '~/data/channels'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { channels: CHANNELS, navigation: getNavigation() } }
}

const VideosPage = props => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'VIDEOS']}
    navigation={props.navigation}
  >
    <Videos channels={props.channels} />
  </Layout>
)

export default VideosPage
