import { getEntry } from '~/helpers/sanity'
import serializeDate from '~/helpers/serializeDate'

const FIELDS = `
_id,
_updatedAt,
tiers[] {
  name,
  "cards": cards[] -> id
}
`

const getEqualTierList = async ({ isPreview } = {}) => {
  const list = await getEntry({
    conditions: ['_type == "equalTierList"'],
    fields: FIELDS,
    options: { isPreview },
  })

  const date = serializeDate(list._updatedAt.split('T')[0])

  return { tiers: list.tiers, date }
}

export default getEqualTierList
