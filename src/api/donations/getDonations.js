import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDonations = async (order = 'date desc') => {
  const donations = await getEntries({
    conditions: ['_type == "donation"'],
    options: { order },
  })

  return donations.map(clean)
}

export default getDonations
