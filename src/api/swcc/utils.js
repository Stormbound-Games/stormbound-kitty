import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
week,
season,
date,
name,
"id": coalesce(id, winner.id),
"author": coalesce(user, winner.user) -> { name, "slug": slug.current }
`

export const MAPPER = contest => {
  contest.date = serializeDate(contest.date, false)

  return contest
}
