import React from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://stormbound-kitty.com'

export default React.memo(function PageMeta(props) {
  return (
    <Helmet titleTemplate='%s — Stormbound Kitty'>
      <title>{props.title}</title>
      <link rel='canonical' href={window.location.href} />
      <meta property='og:title' content={props.title + ' — Stormbound Kitty'} />
      <meta name='description' content={props.description} />
      {!!props.author && <meta name='author' content={props.author} />}
      <meta property='og:description' content={props.description} />
      <meta property='og:url' content={window.location.href} />
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
    </Helmet>
  )
})
