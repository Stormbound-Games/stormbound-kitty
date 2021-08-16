import React from 'react'
import Head from 'next/head'
import useRouter from '~/hooks/useRouter'

const SITE_URL = 'https://stormbound-kitty.com'

export default React.memo(function PageMeta(props) {
  const { location } = useRouter()

  return (
    <Head titleTemplate='%s – Stormbound-Kitty'>
      <title>{props.title}</title>
      <link
        rel='canonical'
        href={'https://stormbound-kitty.com' + location.pathname}
      />
      <meta property='og:title' content={props.title + ' – Stormbound-Kitty'} />
      <meta
        property='twitter:title'
        content={props.title + ' – Stormbound-Kitty'}
      />
      <meta name='description' content={props.description} />
      {!!props.author && <meta name='author' content={props.author} />}
      <meta property='og:description' content={props.description} />
      <meta property='twitter:description' content={props.description} />
      <meta
        property='og:url'
        content={'https://stormbound-kitty.com' + location.pathname}
      />
      {!!props.image ? (
        <meta
          property='og:image'
          content={
            props.image.startsWith('https://')
              ? props.image
              : SITE_URL + props.image
          }
        />
      ) : (
        <meta property='og:image' content={SITE_URL + '/favicon.png'} />
      )}
      {props.noIndex && <meta name='robots' content='noindex, nofollow' />}
    </Head>
  )
})
