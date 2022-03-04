import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SITE_URL = 'https://stormbound-kitty.com'
const DEFAULT_DESCRIPTION =
  'Stormbound-Kitty aims at providing tools and information about Sheepyard’s great game, and extending its players’ experience outside the game'

export default React.memo(function PageMeta(props) {
  const { asPath: location } = useRouter()
  const description = props.description || DEFAULT_DESCRIPTION
  const title =
    props.metaTitle || props.title
      ? `${props.metaTitle || props.title} – Stormbound-Kitty`
      : 'Stormbound-Kitty'
  const author = props.author || 'Kitty'
  const image = props.image
    ? props.image.startsWith('https://')
      ? props.image
      : SITE_URL + props.image
    : 'https://cdn.sanity.io/images/5hlpazgd/production/87e0bf6ba32d6c2700343a69c93ca7be97005760-512x512.png?auto=format&w=256&h=256'

  return (
    <Head>
      <title>{title}</title>

      <link rel='preconnect' href='https://cdn.sanity.io' />

      <link rel='canonical' href={SITE_URL + location} />
      <meta name='author' content={author} />
      <meta name='description' content={description} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={SITE_URL + location} />

      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />

      {props.noIndex && <meta name='robots' content='noindex, nofollow' />}
    </Head>
  )
})
