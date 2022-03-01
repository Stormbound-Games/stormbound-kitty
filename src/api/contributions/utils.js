import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"author": coalesce(user -> name, author),
date,
entries
`

export const MAPPER = contribution => {
  contribution.date = serializeDate(contribution.date)
  return contribution
}
