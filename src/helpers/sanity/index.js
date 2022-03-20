import { client, previewClient } from '~/constants/sanity'

const isDraftEntry = entry => entry._id.startsWith('drafts.')
const isPublishedEntry = entry => !entry._id.startsWith('drafts.')
const isNotSelf = entry => item => item._id !== entry._id

const findSameEntry = (current, array) => {
  const otherEntries = array.filter(isNotSelf(current))
  const isDraft = isDraftEntry(current)
  const isSameEntry = entry =>
    // If the current entry is a draft, a duplicate would be a published version
    // with the same ID but without the `drafts.` part. If the current entry is
    // a published version, a duplicate would be a draft version with the same
    // ID starting with the `drafts.` part.
    isDraft ? current._id.endsWith(entry._id) : entry._id.endsWith(current._id)

  return otherEntries.find(isSameEntry)
}

// Try to find the current entry in the array with a different publication
// status (draft if it’s published, or published if it’s draft). If the same
// entry has been found in the array but with a different publication status,
// it means it is both published and drafted. In that case, we should only
// preserve the draft version (most recent).
const preserveDrafts = (current, _, array) =>
  findSameEntry(current, array) ? isDraftEntry(current) : true

export const getEntry = async ({
  conditions,
  fields,
  params,
  options = {},
}) => {
  // Limit the amount of results to 1 when the preview mode is *not* enabled
  // since the production Sanity client cannot return draft entries sanyway.
  const slice = options.isPreview ? options.slice : 0
  const query = createQuery({
    conditions,
    fields,
    options: { ...options, slice },
  })

  if (options.isPreview) {
    const entries = await previewClient.fetch(query, params)

    return entries.find(isDraftEntry) || entries.find(isPublishedEntry)
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
  const sanityClient = options.isPreview ? previewClient : client
  const entries = await sanityClient.fetch(query, params)

  return options.isPreview ? entries.filter(preserveDrafts) : entries
}

const createQuery = ({ conditions, fields = '...', options = {} }) => {
  const slice = typeof options.slice !== 'undefined' ? `[${options.slice}]` : ''
  const order = options.order ? `| order(${options.order})` : ''

  if (
    options.isPreview &&
    // This regular expression is certainly not bulletproof, but is a decent way
    // to figure out whether the `_id` field has been queried as is (not
    // aliased, e.g. `"id": _id`).
    !(/(^|\n|,)\s*_id/.test(fields) || fields.includes('...'))
  ) {
    fields = `_id, ${fields}`
  }

  return `*[${conditions.join(' && ')}] { ${fields} } ${order} ${slice}`
}
