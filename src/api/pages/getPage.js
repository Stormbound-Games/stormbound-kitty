import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/users/blocks'
import { FIELDS, MAPPER } from './utils'

const getPage = async ({ slug = null, isPreview } = {}) => {
  const page = await getEntry({
    conditions: ['_type == "page"', 'slug.current == $slug'],
    fields: `
      ${FIELDS},
      defined(background.ratio) => { "ratio": string(background.ratio) + "%" },
      "background": background { "url": asset -> url }.url,
      content[] { ${blocks} }
    `,
    params: { slug },
    options: { isPreview },
  })

  return page ? MAPPER(page) : null
}

export default getPage
