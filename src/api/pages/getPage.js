import { getEntry } from '#helpers/sanity'
import blocks from '#api/blocks/index'
import { FIELDS } from './utils.js'

const getPage = async ({ slug = null, isPreview } = {}) => {
  const page = await getEntry({
    conditions: ['_type == "page"', 'slug.current == $slug'],
    fields: `
      ${FIELDS},
      defined(background.ratio) => { "ratio": string(background.ratio) + "%" },
      "background": background.asset -> url,
      content[] { ${blocks} }
    `,
    params: { slug },
    options: { isPreview },
  })

  return page || null
}

export default getPage
