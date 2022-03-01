import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getFAQSections = async ({ isPreview } = {}) => {
  const sections = await getEntries({
    conditions: ['_type == "faqSection"'],
    fields: FIELDS,
    options: { order: 'priority asc', isPreview },
  })

  return sections
}

export default getFAQSections
