import React from 'react'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

export default function Custom404({ settings, cards, ...props }) {
  return (
    <Layout active={[]} settings={settings}>
      <Error {...props} error='404 — Page Not Found' />
    </Layout>
  )
}
