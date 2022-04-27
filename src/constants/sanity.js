import sanityClient from '@sanity/client'

const PROJECT_ID = '5hlpazgd'
const DATASET = 'production'
const API_VERSION = '2022-02-01'

export const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true,
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
