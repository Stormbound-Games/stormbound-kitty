import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/misc/blocks'
import clean from './clean'

const getStory = async ({ slug, isPreview } = {}) => {
  const story = await getEntry({
    conditions: ['_type == "story"', 'slug.current == $slug'],
    params: { slug },
    fields: `
    ...,
    cardRef -> { id },
    content[] { ${blocks} }
    `,
    options: { isPreview },
  })

  return story ? clean(story) : null
}

export default getStory
