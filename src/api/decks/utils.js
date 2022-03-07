import serializeDate from '~/helpers/serializeDate'

export const FIELDS = `
_id,
"author": user -> { name, "slug": slug.current },
date,
id,
name,
nerfed,
"tags": coalesce(
  deckTags[] {
    _type == "tag" => { "tag": @.tag },
    _type == "reference" => { "tag": @->id }
  }.tag,
  tags
)
`

export const MAPPER = deck => {
  deck.date = serializeDate(deck.date)
  deck.tags = deck.tags || []

  if (deck.nerfed) {
    deck.nerfed = serializeDate(deck.nerfed)
  }

  return deck
}
