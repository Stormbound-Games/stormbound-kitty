import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/blocks'
import { FIELDS, MAPPER } from './utils'

const getRelease = async ({
  id = null,
  slug = null,
  date = null,
  isPreview,
} = {}) => {
  const release = await getEntry({
    conditions: ['_type == "release"', 'slug.current == $slug'],
    fields: `
      ${FIELDS},
      defined(background.ratio) => { "ratio": string(background.ratio) + "%" },
      "background": background.asset -> url,
      content[] { ${blocks} }
    `,
    params: { id, slug, date },
    options: { isPreview },
  })

  return release ? MAPPER(release) : null
}

export default getRelease
