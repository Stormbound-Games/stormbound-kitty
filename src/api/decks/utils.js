import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
"author": user -> { name, "slug": slug.current },
date,
id,
name,
nerfed,
"tags": coalesce(deckTags[] -> { name, "slug": slug.current }, [])
`

export const MAPPER = deck => {
  deck.date = serializeDate(deck.date)

  if (deck.nerfed) {
    deck.nerfed = serializeDate(deck.nerfed)
  }

  return deck
}
