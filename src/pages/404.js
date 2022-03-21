import React from 'react'
import Script from 'next/script'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

export default function Custom404({ settings, ...props }) {
  return (
    <Layout active={[]} settings={settings}>
      <Error {...props} error='404 — Page Not Found' />
      <Script id='404-tracking' strategy='lazyOnload'>
        {`if (window.plausible) window.plausible("404", { props: { path: document.location.pathname } });`}
      </Script>
    </Layout>
  )
}
