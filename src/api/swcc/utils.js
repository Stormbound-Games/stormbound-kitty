import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
id,
date,
name,
winner { author, id },
"season": ^.number
`

export const MAPPER = season => {
  season.weeks.forEach(week => {
    week.date = serializeDate(week.date, false)
  })

  return season
}
