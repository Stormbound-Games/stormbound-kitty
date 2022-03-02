import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"users": users[] -> { name, "slug": slug.current },
date,
data,
type
`

export const MAPPER = event => {
  event.date = serializeDate(event.date)
  Object.assign(event, JSON.parse(event.data))

  return event
}
