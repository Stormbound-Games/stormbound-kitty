import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
name,
type,
description,
"hosts": users[] -> { name, "slug": slug.current },
"podium": podium[] { "users": team[] -> { name, "slug": slug.current } }.users,
"decks": coalesce(decks[] { id, authors, name }, []),
date
`

export const MAPPER = tournament => {
  tournament.date = serializeDate(tournament.date)

  return tournament
}
