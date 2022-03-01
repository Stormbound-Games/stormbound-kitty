import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
name,
type,
description,
hosts,
"podium": podium[].players,
"decks": coalesce(decks[] { id, authors, name }, []),
date
`

export const MAPPER = tournament => {
  tournament.date = serializeDate(tournament.date)

  return tournament
}
