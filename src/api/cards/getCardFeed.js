import { getEntries } from '~/helpers/sanity'
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

// This function requires the card document reference (`ref`) and its name
// (`name`) as parameters to avoid having to perform an additional query to get
// them. This should speed us build time by removing a significant amount of
// extra queries.
const getCardFeed = async ({ params, isPreview } = {}) => {
  const references = await getEntries({
    conditions: [
      'references($ref)',
      '(' +
        [
          '(_type == "artwork")',
          '(_type == "story" && !saga)',
          '(_type == "guide" && name match $name)',
        ].join(' || ') +
        ')',
    ],
    fields: `
      _type,
      _type == "artwork" => { ${ARTWORK_FIELDS} },
      _type == "story" => { ${STORY_FIELDS} },
      _type == "guide" => { ${GUIDE_FIELDS} }
    `,
    params,
    options: { order: 'date desc', isPreview },
  })

  const feed = references.map(entry => cleaners[entry._type](entry))

  return feed
}

export default getCardFeed
