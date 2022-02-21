import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getStory = async slug => {
  const story = await getEntry({
    conditions: ['_type == "story"', 'slug.current == $slug'],
    params: { slug },
  })

  return story ? clean(story) : null
}

export default getStory
