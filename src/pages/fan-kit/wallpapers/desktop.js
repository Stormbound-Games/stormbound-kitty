import React from 'react'
import FanKitWallpapersDesktop from '~/components/FanKitWallpapersDesktop'
import Layout from '~/components/Layout'
import getWallpapersFromType from '~/api/wallpapers/getWallpapersFromType'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const wallpapers = await getWallpapersFromType({ type: 'DESKTOP', isPreview })

  return {
    props: { settings, wallpapers },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitWallpapersPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} settings={settings}>
    <FanKitWallpapersDesktop {...props} />
  </Layout>
)

export default FanKitWallpapersPage
