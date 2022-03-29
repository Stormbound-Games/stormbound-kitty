import { getEntry, getEntries } from '~/helpers/sanity'
import {
  FIELDS as ARTWORK_FIELDS,
  MAPPER as ARTWORK_MAPPER,
} from '~/api/artworks/utils'
import {
  FIELDS as STORY_FIELDS,
  MAPPER as STORY_MAPPER,
} from '~/api/stories/utils'
import {
  FIELDS as GUIDE_FIELDS,
  MAPPER as GUIDE_MAPPER,
} from '~/api/guides/utils'

const cleaners = {
  artwork: ARTWORK_MAPPER,
  guide: GUIDE_MAPPER,
  story: STORY_MAPPER,
}

const getCardFeed = async ({ id, isPreview } = {}) => {
  const card = await getEntry({
    conditions: ['_type == "card"', 'coalesce(id.current, id) match $id'],
    fields: `_id, name`,
    params: { id },
    options: { isPreview },
  })

  if (!card) return []

  const references = await getEntries({
    conditions: [
      'references($ref)',
      '(' +
        [
          '(_type == "artwork")',
          '(_type == "story" && !defined(saga))',
          '(_type == "guide" && name match $name)',
        ].join(' || ') +
        ')',
    ],
    fields: `
      _type,
      _type == "artwork" => { _id, ${ARTWORK_FIELDS} },
      _type == "story" => { _id, ${STORY_FIELDS} },
      _type == "guide" => { _id, ${GUIDE_FIELDS} }
    `,
    params: { ref: card._id, name: card.name },
    options: { order: 'date desc', isPreview },
  })

  const feed = references.map(({ _id, ...entry }) =>
    cleaners[entry._type](entry)
  )

  return feed
}

export default getCardFeed
