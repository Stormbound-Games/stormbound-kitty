import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/blocks'
import { FIELDS } from './utils'

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
