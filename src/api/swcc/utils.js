import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
week,
season,
date,
name,
winner { user -> { name, "slug": slug.current }, id },
`

export const MAPPER = contest => {
  contest.date = serializeDate(contest.date, false)

  return contest
}
