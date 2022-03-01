import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
name,
type,
description,
"hosts": coalesce(users[] -> name, hosts),
"podium": coalesce(podium[] { "users": team[] -> name }.users, podium[].players),
"decks": coalesce(decks[] { id, authors, name }, []),
date
`

export const MAPPER = tournament => {
  tournament.date = serializeDate(tournament.date)

  return tournament
}
