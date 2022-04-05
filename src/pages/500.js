import React from 'react'
import Script from 'next/script'
import Error from '~/components/Error'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

export default function Custom500({ settings, ...props }) {
  return (
    <Layout active={[]} settings={settings}>
      <Error {...props} error='500 — Internal Server Error' />
      <Script id='500-tracking' strategy='lazyOnload'>
        {`if (window.plausible) window.plausible("500", { props: { path: document.location.pathname } });`}
      </Script>
    </Layout>
  )
}
