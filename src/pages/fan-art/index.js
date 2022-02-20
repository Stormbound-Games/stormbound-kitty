import React from 'react'
import FanArt from '~/components/FanArt'
import Layout from '~/components/Layout'
import shuffle from '~/helpers/shuffle'
import getArtworks from '~/api/artworks/getArtworks'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return {
    props: {
      navigation: getNavigation(),
      artworks: shuffle(await getArtworks()),
    },
  }
}

const FanArtPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'FAN_ART']} navigation={navigation}>
    <FanArt {...props} />
  </Layout>
)

export default FanArtPage
