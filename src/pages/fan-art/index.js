import React from 'react'
import FanArt from '~/components/FanArt'
import Layout from '~/components/Layout'
import getArtworks from '~/api/artworks/getArtworks'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const artworks = await getArtworks({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { artworks, settings } }
}

const FanArtPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'FAN_ART']} settings={settings}>
    <FanArt {...props} />
  </Layout>
)

export default FanArtPage
