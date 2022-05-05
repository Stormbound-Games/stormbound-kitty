import sanityClient from '@sanity/client'

const configuration = {
  projectId: '5hlpazgd',
  dataset: 'production',
  apiVersion: '2022-02-01',
}

export const client = sanityClient({
  ...configuration,
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

// Explicitly skip the instantiation of the preview client when the token is not
// defined to let the preview mode crash. Otherwise, the preview client would
// silently behave like the production client, which would lead to a non-
// functional preview mode without any error.
export const previewClient = process.env.SANITY_PREVIEW_TOKEN
  ? sanityClient({
      ...configuration,
      useCdn: false,
      // Passing a token is what makes it possible to retrieve draft documents.
      // “A draft document does not appear on the APIs to unauthenticated users”
      // See: https://www.sanity.io/docs/drafts
      token: process.env.SANITY_PREVIEW_TOKEN,
    })
  : null
