import parseCardGuess from '../parseCardGuess'

const IS_TOKEN = /^is:/
const MANA_TOKEN = /^mana?:/
const STR_TOKEN = /^str(?:ength)?:/
const MOV_TOKEN = /^(mov(?:ement)?|spe(?:ed)?):/

const parseToRange = value => {
  if (
    value.match(/[^-]+-[^-]/) &&
    value.split('-').every(chunk => !isNaN(+chunk))
  ) {
    return value
  }

  if (value.endsWith('+') || value.startsWith('>')) {
    const low = +value.replace(/[+>]/g, '')
    if (!isNaN(low)) return [low, Infinity].join('-')
  }

  if (value.endsWith('-') || value.startsWith('<')) {
    const high = +value.replace(/[<-]/g, '')
    if (!isNaN(high)) return [0, high].join('-')
  }

  if (!isNaN(+value)) return +value
}

export default value => {
  const chunks = value.split(/\s+/g)
  const is = chunks.filter(chunk => chunk.match(IS_TOKEN))
  const text = chunks.filter(chunk => !chunk.includes(':')).join(' ')
  const accumulator = text ? { text } : {}
  const manaChunk = chunks.find(chunk => chunk.match(MANA_TOKEN))
  const strChunk = chunks.find(chunk => chunk.match(STR_TOKEN))
  const movChunk = chunks.find(chunk => chunk.match(MOV_TOKEN))

  if (manaChunk) {
    const mana = parseToRange(manaChunk.replace(MANA_TOKEN, ''))
    if (mana) accumulator.mana = mana
  }

  if (strChunk) {
    const strength = parseToRange(strChunk.replace(STR_TOKEN, ''))
    if (strength) accumulator.strength = strength
  }

  if (movChunk) {
    const movement = parseToRange(movChunk.replace(MOV_TOKEN, ''))
    if (movement) accumulator.movement = movement
  }

  return is.reduce((acc, chunk) => {
    const term = chunk.replace(IS_TOKEN, '')
    const [key, value] = parseCardGuess(term)
    if (key) acc[key] = value
    return acc
  }, accumulator)
}
