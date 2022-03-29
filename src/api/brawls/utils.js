export const FIELDS = `
id,
name,
description,
"slug": slug.current,
"cardId": card -> { "id": id.current }.id
`

export const MAPPER = brawl => {
  return brawl
}
