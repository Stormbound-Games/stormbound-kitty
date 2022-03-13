import React from 'react'
import FanKitAvatars from '~/components/FanKitAvatars'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getAvatars from '~/api/avatars/getAvatars'

export async function getStaticProps({ preview: isPreview = false }) {
  const avatars = await getAvatars({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { avatars, settings },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitAvatarsPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} settings={settings}>
    <FanKitAvatars {...props} />
  </Layout>
)

export default FanKitAvatarsPage
