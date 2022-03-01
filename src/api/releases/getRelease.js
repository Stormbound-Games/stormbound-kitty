import { getEntry } from '~/helpers/sanity'
import blocks from '~/api/misc/blocks'
import { FIELDS, MAPPER } from './utils'

const getRelease = async ({
  id = null,
  slug = null,
  date = null,
  isPreview,
} = {}) => {
  const release = await getEntry({
    conditions: [
      '_type == "release"',
      '(id == $id || slug.current == $slug || date == $date)',
    ],
    fields: `
      ${FIELDS},
      defined(background.ratio) => { "ratio": string(background.ratio) + "%" },
      "background": background { "url": asset -> url }.url,
      content[] { ${blocks} }
    `,
    params: { id, slug, date },
    options: { isPreview },
  })

  return release ? MAPPER(release) : null
}

export default getRelease
