import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getContributionsFromAuthor = async author => {
  const contributions = await getEntries({
    conditions: ['_type == "contribution"', 'author match $author'],
    params: { author },
  })

  return contributions.map(clean)
}

export default getContributionsFromAuthor
