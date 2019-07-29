import React from 'react'
import { Helmet } from 'react-helmet'

const PageMeta = props => (
  <Helmet titleTemplate="%s — Stormbound Kitty">
    <title>{props.title}</title>
    <meta property="og:title" content={props.title} />
    <meta name="description" content={props.description} />
    {!!props.author && <meta name="author" content={props.author} />}
    <meta property="og:description" content={props.description} />
    <meta property="og:site_name" content="Stormbound Kitty" />
    <meta property="og:url" content={window.location.href} />
    {props.noIndex && <meta name="robots" content="noindex, nofollow" />}
  </Helmet>
)

export default PageMeta
