import parseCardGuess from '../parseCardGuess'

const IS_TOKEN = 'is:'
const MANA_TOKEN = 'mana:'
const STR_TOKEN = 'str:'
const MOV_TOKEN = 'mov:'

const parseToRange = value => {
  if (value.endsWith('+') || value.startsWith('>')) {
    return [+value.replace(/[+>]/g, ''), Infinity].join('-')
  }

  if (value.endsWith('-') || value.startsWith('<')) {
    return [0, +value.replace(/[<-]/g, '')].join('-')
  }

  if (!isNaN(+value)) {
    return +value
  }
}

export default value => {
  const chunks = value.split(/\s+/g)
  const is = chunks.filter(chunk => chunk.startsWith(IS_TOKEN))
  const text = chunks.filter(chunk => !chunk.includes(':')).join(' ')
  const accumulator = text ? { text } : {}
  const manaChunk = chunks.find(chunk => chunk.startsWith(MANA_TOKEN))
  const strChunk = chunks.find(chunk => chunk.startsWith(STR_TOKEN))
  const movChunk = chunks.find(chunk => chunk.startsWith(MOV_TOKEN))

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
