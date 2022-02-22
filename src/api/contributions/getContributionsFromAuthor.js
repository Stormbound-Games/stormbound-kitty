import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getContributionsFromAuthor = async ({ author, isPreview } = {}) => {
  const contributions = await getEntries({
    conditions: ['_type == "contribution"', 'author match $author'],
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return contributions.map(clean)
}

export default getContributionsFromAuthor
