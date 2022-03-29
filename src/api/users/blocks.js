const card = `
"cardId": coalesce(
  card -> id,
  *[ _type == "card" && _id in ["drafts." + ^.card._ref, ^.card._ref] ][0].id.current,
  *[ _type == "card" && _id in ["drafts." + ^.card._ref, ^.card._ref] ][0].id,
  cardId
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

const block = `..., ${markDefs}`

const blocks = `
${block},
_type == "columns" => {
  columns[] {
    ...,
    content[] {
      ${block},
      _type == "card" => { ..., ${card} },
      _type == "deckEmbed" => { ..., ${deckAuthor}, ${deckTags} },
      _type == "info" => { ..., content[] { ${block} } },
      _type == "manaGraph" => { ..., "modifier": coalesce(modifier, brawl -> id) },
    }
  }
},
_type == "battleSim" => { content[] { ${block} } },
_type == "card" => { ..., ${card} },
_type == "deckEmbed" => { ..., ${deckAuthor}, ${deckTags} },
_type == "faq" => { entries[] { "id": id.current, question, answer[] { ${block} } } },
_type == "info" => { content[] { ${block} } },
_type == "manaGraph" => { ..., "modifier": coalesce(modifier, brawl -> id) },
_type == "nerfCompensation" => { "cards": cards[] -> { id }.id },
`

export default blocks
