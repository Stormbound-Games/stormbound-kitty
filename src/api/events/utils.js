import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"authors": coalesce(users[] -> name, authors),
date,
data,
type
`

export const MAPPER = event => {
  event.date = serializeDate(event.date)
  Object.assign(event, JSON.parse(event.data))

  return event
}
