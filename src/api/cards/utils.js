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

"image": image { "url": asset -> url }.url
`

export const MAPPER = card => {
  // The movement is recorded as a string in case it needs to change across
  // levels, but right now the site doesn’t support that and expects a number.
  if (card.movement) {
    card.movement = Number(card.movement)
  } else {
    card.movement = null
  }

  return card
}
