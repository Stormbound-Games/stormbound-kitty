import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getStories = async () => {
  const stories = await getEntries({
    conditions: ['_type == "story"'],
  })

  return stories.map(clean)
}

export default getStories
