import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getGuidesFromCategory = async category => {
  const guides = await getEntries({
    conditions: ['_type == "guide"', 'category == $category'],
    params: { category },
    options: { order: 'date desc' },
  })

  return guides.map(clean)
}

export default getGuidesFromCategory
