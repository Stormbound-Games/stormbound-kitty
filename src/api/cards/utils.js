export const FIELDS = `
"id": id.current,
"sid": sid.current,

name,
faction,
type,
unitTypes,
rarity,
token,

strength,
mana,
movement,
fixedMovement,
ability,

"image": image.asset -> url
`

export const MAPPER = card => {
  // The movement is recorded as a string in case it needs to change across
  // levels, but right now the site doesn’t support that and expects a number.
  card.movement = card.movement ? Number(card.movement) : null

  return card
}
