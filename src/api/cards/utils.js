export const FIELDS = `
"id": id.current,
"sid": sid.current,

name,
faction,
type,
"unitTypes": coalesce(unitTypes, []),
rarity,
token,
token => { withoutLevel },

strength,
mana,
movement,
fixedMovement,
ability,

"image": image.asset -> url
`

export const MAPPER = card => {
  // The movement and the mana cost are recorded as strings in case they need
  // to change across levels, but right now the site doesn’t support that and
  // expects a number.
  card.movement = card.movement ? Number(card.movement) : null
  card.mana = card.mana ? Number(card.mana) : null

  return card
}
