import { client, previewClient } from '~/constants/sanity'
import {
  createQuery,
  isDraftEntry,
  isPublishedEntry,
  preserveDrafts,
  withoutSanityId,
} from './utils'

export const getEntry = async ({
  conditions,
  fields,
  params,
  options = {},
}) => {
  // Limit the amount of results to 1 (groq `[0]`) when the preview mode is
  // *not* enabled since the production Sanity client cannot return draft
  // entries anyway.
  const slice = options.isPreview ? options.slice : 0
  const query = createQuery({
    conditions,
    fields,
    options: { ...options, slice },
  })

  if (options.isPreview) {
    if (!previewClient) {
      throw new Error('Missing `SANITY_PREVIEW_TOKEN` environment variable')
    }

    const entries = await previewClient.fetch(query, params)
    const entry = entries.find(isDraftEntry) || entries.find(isPublishedEntry)

    return entry ? withoutSanityId(entry) : null
  }

  return client.fetch(query, params)
}

export const getEntries = async ({
  conditions,
  fields,
  params,
  options = {},
}) => {
  const query = createQuery({ conditions, fields, options })

  if (options.isPreview) {
    if (!previewClient) {
      throw new Error('Missing `SANITY_PREVIEW_TOKEN` environment variable')
    }

    const entries = await previewClient.fetch(query, params)

    return entries.filter(preserveDrafts).map(withoutSanityId)
  }

  return client.fetch(query, params)
}
