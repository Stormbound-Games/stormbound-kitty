const markDefs = `
markDefs[] {
  ...,
  _type == "cardLink" => {
    ..., "cardId": coalesce(card -> { id }.id, cardId)
  }
}
`

export default markDefs
