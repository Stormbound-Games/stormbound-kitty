export const markDefs = `
markDefs[] {
  ...,
  _type == "cardLink" => {
    ..., "cardId": coalesce(card -> { id }.id, cardId)
  }
}
`

const blocks = `
...,
${markDefs},
_type == "info" => { ..., content[] { ..., ${markDefs} } },
_type == "battleSim" => { ..., content[] { ..., ${markDefs} } },
_type == "nerfCompensation" => { ..., "cards": cards[] -> { id }.id },
_type == "faq" => { ..., entries[] { id, question, answer[] { ..., ${markDefs} } } },
_type == "card" => {
  ...,
  "cardId": coalesce(
    card -> { id }.id,
    *[ _type == "card" && _id == ("drafts." + ^.card._ref) ][0] { id }.id,
    cardid
  )
}
`

export default blocks
