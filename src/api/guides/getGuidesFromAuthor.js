import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getGuidesFromAuthor = async ({ author, isPreview } = {}) => {
  const guides = await getEntries({
    conditions: ['_type == "guide"', 'count(authors[lower(@) == $author]) > 0'],
    params: { author },
    fields: `..., card -> { id }`,
    options: { order: 'date desc', isPreview },
  })

  return guides.map(clean)
}

export default getGuidesFromAuthor
