import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
week,
season,
date,
name,
id,
"author": user -> { name, "slug": slug.current }
`

export const MAPPER = contest => {
  contest.date = serializeDate(contest.date, false)

  return contest
}
