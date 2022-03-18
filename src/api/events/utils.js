import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
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
