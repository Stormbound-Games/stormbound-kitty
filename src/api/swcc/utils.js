import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
week,
season,
date,
name,
winner { user -> { name, "slug": slug.current }, id },
`

export const MAPPER = week => {
  week.date = serializeDate(week.date, false)

  return week
}
