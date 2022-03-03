import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

const FanKitBooksPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} settings={settings}>
    <FanKitBooks {...props} />
  </Layout>
)

export default FanKitBooksPage
