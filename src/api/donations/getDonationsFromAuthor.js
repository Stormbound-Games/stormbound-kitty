import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDonationsFromAuthor = async author => {
  const donations = await getEntries({
    conditions: ['_type == "donation"', 'author match $author'],
    params: { author },
  })

  return donations.map(clean)
}

export default getDonationsFromAuthor
