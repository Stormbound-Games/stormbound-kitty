import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
id,
date,
name,
winner { user -> { name, "slug": slug.current }, id },
"season": ^.number
`

export const MAPPER = season => {
  season.weeks.forEach(week => {
    week.date = serializeDate(week.date, false)
    week._type = 'swcc'

    return week
  })

  return season
}

export const FEED_MAPPER = season => MAPPER(season).weeks
