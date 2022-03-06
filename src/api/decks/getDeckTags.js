import { getEntries } from '~/helpers/sanity'
import { TAGS } from '~/constants/deck'

const getDeckTags = async ({ isPreview } = {}) => {
  const brawls = await getEntries({
    conditions: ['_type == "brawl"'],
    fields: `_id, id, name`,
    options: { isPreview },
  })
  const tags = { ...TAGS }

  brawls.forEach(brawl => {
    tags[brawl.id] = brawl.name
  })

  return tags
}

export default getDeckTags
