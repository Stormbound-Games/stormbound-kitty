import { getEntries } from '~/helpers/sanity'

const getDeckTags = async ({ isPreview } = {}) => {
  const tags = await getEntries({
    conditions: ['_type == "deckTag"'],
    fields: `_id, name, "slug": slug.current`,
    options: { isPreview },
  })

  return tags
}

export default getDeckTags
