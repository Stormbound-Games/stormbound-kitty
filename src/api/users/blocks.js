const card = `
"cardId": coalesce(
  card -> id,
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

const block = `..., ${markDefs}`

const blocks = `
${block},
_type == "columns" => {
  columns[] {
    ...,
    content[] {
      ${block},
      _type == "card" => { ..., ${card} },
      _type == "info" => { ..., content[] { ${block} } },
    }
  }
},
_type == "info" => { content[] { ${block} } },
_type == "battleSim" => { content[] { ${block} } },
_type == "nerfCompensation" => { "cards": cards[] -> { id }.id },
_type == "faq" => { entries[] { id, question, answer[] { ${block} } } },
_type == "card" => { ..., ${card} }
`

export default blocks
