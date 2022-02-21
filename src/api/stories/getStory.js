import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getStory = async ({ slug, isPreview } = {}) => {
  const story = await getEntry({
    conditions: ['_type == "story"', 'slug.current == $slug'],
    params: { slug },
    options: { isPreview },
  })

  return story ? clean(story) : null
}

export default getStory
