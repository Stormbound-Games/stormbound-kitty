import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"author": coalesce(user -> name, author),
date
`

export const MAPPER = donation => {
  donation.date = serializeDate(donation.date)
  return donation
}
