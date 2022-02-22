import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getGuidesFromAuthor = async author => {
  const guides = await getEntries({
    conditions: ['_type == "guide"', 'count(authors[lower(@) == $author]) > 0'],
    params: { author },
    options: { order: 'date desc' },
  })

  return guides.map(clean)
}

export default getGuidesFromAuthor
