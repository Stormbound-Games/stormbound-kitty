import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getGuides = async () => {
  const guides = await getEntries({
    conditions: ['_type == "guide"'],
    options: { order: 'date desc' },
  })

  return guides.map(clean)
}

export default getGuides
