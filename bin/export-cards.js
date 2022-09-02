import { writeFile } from 'fs/promises'
import { client } from '../src/constants/sanity'

const OUT = './cards.json'
const FACTIONS = ['neutral', 'winter', 'ironclad', 'shadowfen', 'swarm']
const QUERY = `*[ _type == "card" ] {
  "id": id.current,
  "sid": sid.current,
  name,
  type,
  faction,
  unitTypes,
  rarity,
  mana,
  ability,
  strength,
  movement,
  token => { token },
  "image": image.asset -> url
}`

client
  .fetch(QUERY)
  .then(data => data.map(normalizeCard).sort(sortCards))
  .then(data => writeFile(OUT, JSON.stringify(data, null, 2)))

function normalizeCard(card) {
  return {
    ...card,
    mana: +card.mana,
    movement: card.movement ? +card.movement : undefined,
    ability: card.ability || undefined,
    rarity: card.rarity || undefined,
    strength: card.strength || undefined,
    unitTypes:
      card.unitTypes && card.unitTypes.length ? card.unitTypes : undefined,
  }
}

function sortCards(a, b) {
  const factionIndexA = FACTIONS.indexOf(a.faction)
  const factionIndexB = FACTIONS.indexOf(b.faction)

  if (a.token && !b.token) return +1
  if (!a.token && b.token) return -1

  if (factionIndexA > factionIndexB) return +1
  if (factionIndexA < factionIndexB) return -1

  if (+a.mana > +b.mana) return +1
  if (+a.mana < +b.mana) return -1

  return a.name > b.name ? +1 : -1
}
