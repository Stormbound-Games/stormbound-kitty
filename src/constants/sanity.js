import sanityClient from '@sanity/client'

const PROJECT_ID = '5hlpazgd'
const DATASET = 'production'
const API_VERSION = '2022-02-01'

export const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  // Using Sanity’s API CDN is generally good for performance, but does not play
  // too nicely with on-demand revalidation. When the Sanity webhook instructs
  // Next.js to rebuild a certain path, data queries to Sanity CDN may return
  // stale data since they might be cached. This is a problem as it essentially
  // negates the revalidation. That being said, we can safely use the API CDN a
  // build time (during `next build`) since builds are performed to ship code
  // and not to refresh data.
  // See: https://www.sanity.io/docs/api-cdn
  useCdn: Boolean(Number(process.env.CI)),
})

export const previewClient = process.env.SANITY_PREVIEW_TOKEN
  ? sanityClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      useCdn: false,
      token: process.env.SANITY_PREVIEW_TOKEN,
      apiVersion: API_VERSION,
    })
  : null
