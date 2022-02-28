import { getEntry } from '~/helpers/sanity'
import markDefs from '~/api/misc/markDefs'
import clean from './clean'

const getStory = async ({ slug, isPreview } = {}) => {
  const story = await getEntry({
    conditions: ['_type == "story"', 'slug.current == $slug'],
    params: { slug },
    fields: `
    ...,
    cardRef -> { id },
    content[] { ..., ${markDefs} }
    `,
    options: { isPreview },
  })

  return story ? clean(story) : null
}

export default getStory
