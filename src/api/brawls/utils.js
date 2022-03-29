export const FIELDS = `
id,
name,
description,
"slug": slug.current,
"cardId": card -> { "id": coalesce(id.current, id) }.id
`

export const MAPPER = brawl => {
  return brawl
}
