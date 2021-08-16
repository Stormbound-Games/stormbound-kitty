import React from 'react'
import Videos from '~/components/Videos'
import Layout from '~/components/Layout'

const VideosPage = () => (
  <Layout active={['COMMUNITY', 'VIDEOS']}>
    <Videos />
  </Layout>
)

export default VideosPage
