import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getStories = async ({ isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"'],
    options: { isPreview },
  })

  return stories.map(clean)
}

export default getStories
