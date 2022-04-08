import React from 'react'
import Script from 'next/script'
import Error from '~/components/Error'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

export default function Custom404() {
  return (
    <>
      <Error title='The page was not found' error='404 — Page Not Found' />
      <Script id='404-tracking' strategy='lazyOnload'>
        {`if (window.plausible) window.plausible("404", { props: { path: document.location.pathname } });`}
      </Script>
    </>
  )
}
