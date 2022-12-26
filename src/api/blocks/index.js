export const card = `
"cardId": coalesce(
  card -> id.current,
  *[ _type == "card" && _id in ["drafts." + ^.card._ref, ^.card._ref] ][0].id.current
)
`

export const markDefs = `
markDefs[] {
  ...,
  _type == "cardLink" => {
    ...,
    ${card}
  }
}
`

const deckTags = `"tags": deckTags[] -> { name, "slug": slug.current }`
const deckAuthor = `"author": user -> { name, "slug": slug.current }`
const image = `"src": asset -> url`

export const block = `..., ${markDefs}`

const blocks = `
${block},
_type == "columns" => {
  columns[] {
    ...,
    content[] {
      ${block},
      _type == "card" => { ..., ${card} },
      _type == "deckEmbed" => { ..., ${deckAuthor}, ${deckTags} },
      _type == "image" => { ${image} },
      _type == "info" => { ..., content[] { ${block} } },
      _type == "manaGraph" => { ..., "modifier": coalesce(modifier, brawl -> id) },
    }
  }
},
_type == "battleSim" => { content[] { ${block} } },
_type == "card" => { ..., ${card}, "ref": card._ref }{ ..., "versions": *[ _type == "changelog" && card._ref == ^.ref && count(from) > 0] | order(date desc) { date, from } },
_type == "deckEmbed" => { ..., ${deckAuthor}, ${deckTags} },
_type == "faq" => { entries[] { "id": id.current, question, answer[] { ${block} } } },
_type == "image" => { ${image} },
_type == "info" => { content[] { ${block} } },
_type == "manaGraph" => { ..., "modifier": coalesce(modifier, brawl -> id) },
_type == "nerfCompensation" => { "cards": cards[] -> id.current },
`

export default blocks
