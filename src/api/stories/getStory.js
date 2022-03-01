import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/users/blocks'
import { FIELDS, MAPPER } from './utils'

const getStory = async ({ slug, isPreview } = {}) => {
  const story = await getEntry({
    conditions: ['_type == "story"', 'slug.current == $slug'],
    fields: `${FIELDS}, "content": body[] { ${blocks} }`,
    params: { slug },
    options: { isPreview },
  })

  return story ? MAPPER(story) : null
}

export default getStory
