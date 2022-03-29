export const FIELDS = `
"id": coalesce(id.current, id),
"sid": coalesce(sid.current, sid),

name,
faction,
type,
race,
rarity,

strength,
mana,
movement,
ability,

elder,
ancient,
hero,
token,

"image": image { "url": asset -> url }.url
`

export const MAPPER = card => {
  // Some cards have `"null"` movement following an error during the data
  // migration. @TODO: correct that with another data migration.
  card.movement = !isNaN(+card.movement) ? +card.movement : null

  return card
}
