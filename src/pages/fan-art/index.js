import React from 'react'
import FanArt from '~/components/FanArt'
import Layout from '~/components/Layout'
import ARTWORKS from '~/data/artworks'
import shuffle from '~/helpers/shuffle'

export async function getStaticProps() {
  return { props: { artworks: shuffle(ARTWORKS) } }
}

const FanArtPage = props => (
  <Layout active={['GAME', 'FAN_ART']}>
    <FanArt artworks={props.artworks} />
  </Layout>
)

export default FanArtPage
