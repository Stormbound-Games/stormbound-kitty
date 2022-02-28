import { getEntries } from '~/helpers/sanity'
import markDefs from '~/api/misc/markDefs'
import clean from './clean'

const getFAQSections = async ({ isPreview } = {}) => {
  const sections = await getEntries({
    conditions: ['_type == "faqSection"'],
    fields: `..., questions[] -> { ... }, content[] { ..., ${markDefs} }`,
    options: { order: 'priority asc', isPreview },
  })

  return sections.map(clean)
}

export default getFAQSections
