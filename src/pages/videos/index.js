import React from 'react'
import Videos from '~/components/Videos'
import Layout from '~/components/Layout'
import CHANNELS from '~/data/channels'

export async function getStaticProps() {
  return { props: { channels: CHANNELS } }
}

const VideosPage = props => (
  <Layout active={['COMMUNITY', 'VIDEOS']}>
    <Videos channels={props.channels} />
  </Layout>
)

export default VideosPage
