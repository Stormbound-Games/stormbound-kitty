import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"author": coalesce(user -> name, author),
date,
id,
name,
nerfed,
tags
`

export const MAPPER = deck => {
  deck.date = serializeDate(deck.date)
  deck.tags = deck.tags || []

  if (deck.nerfed) {
    deck.nerfed = serializeDate(deck.nerfed)
  }

  return deck
}
