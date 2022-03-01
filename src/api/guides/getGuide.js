import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/misc/blocks'
import { FIELDS, MAPPER } from './utils'

const getGuide = async ({
  id = null,
  slug = null,
  name = null,
  isPreview,
} = {}) => {
  const guide = await getEntry({
    conditions: [
      '_type == "guide"',
      '(id == $id || slug.current == $slug || name == $name)',
    ],
    fields: `
      ${FIELDS},
      defined(background.ratio) => { "ratio": string(background.ratio) + "%" },
      "background": background { "url": asset -> url }.url,
      content[] { ${blocks} }
    `,
    params: { id, slug, name },
    options: { isPreview },
  })

  return guide ? MAPPER(guide) : null
}

export default getGuide
