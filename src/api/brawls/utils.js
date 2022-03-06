export const FIELDS = `
_id,
id,
name,
description,
"slug": slug.current,
"cardId": card -> id
`

export const MAPPER = brawl => {
  return brawl
}
