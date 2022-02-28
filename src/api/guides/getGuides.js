import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getGuides = async ({ isPreview } = {}) => {
  const guides = await getEntries({
    conditions: ['_type == "guide"'],
    fields: `..., card -> { id }`,
    options: { order: 'date desc', isPreview },
  })

  return guides.map(clean)
}

export default getGuides
