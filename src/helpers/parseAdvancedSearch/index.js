import parseCardGuess from '~/helpers/parseCardGuess'

const IS_TOKEN = /^is[:=]/
const HAS_TOKEN = /^has[:=]/
const MANA_TOKEN = /^mana?[:=]/
const STR_TOKEN = /^str(?:ength)?[:=]/
const MOV_TOKEN = /^(mov(?:ement)?|spe(?:ed)?)[:=]/

const parseToRange = value => {
  if (
    value.match(/[^-]+-[^-]/) &&
    value.split('-').every(chunk => !isNaN(+chunk))
  ) {
    return value
  }

  if (value.endsWith('+') || value.startsWith('>=')) {
    const low = +value.replace(/[+>=]/g, '')
    if (!isNaN(low)) return [low, Infinity].join('-')
  } else if (value.startsWith('>')) {
    const low = +value.replace('>', '')
    if (!isNaN(low)) return [low + 1, Infinity].join('-')
  }

  if (value.endsWith('-') || value.startsWith('<=')) {
    const high = +value.replace(/[-<=]/g, '')
    if (!isNaN(high)) return [0, high].join('-')
  } else if (value.startsWith('<')) {
    const high = +value.replace('<', '')
    if (!isNaN(high)) return [0, high - 1].join('-')
  }

  if (!isNaN(+value)) return +value
}

const parseAdvancedSearch = value => {
  const accumulator = {}
  const chunks = value.split(/\s+/g)
  const is = chunks.filter(chunk => chunk.match(IS_TOKEN))
  const textChunks = chunks.filter(chunk => !/[:=]/.exec(chunk)).filter(Boolean)
  const manaChunk = chunks.find(chunk => chunk.match(MANA_TOKEN))
  const strChunk = chunks.find(chunk => chunk.match(STR_TOKEN))
  const movChunk = chunks.find(chunk => chunk.match(MOV_TOKEN))
  const hasChunk = chunks.find(chunk => chunk.match(HAS_TOKEN))

  if (textChunks.length > 0) {
    accumulator.text = textChunks.join(' ')
  }

  if (manaChunk) {
    const mana = parseToRange(manaChunk.replace(MANA_TOKEN, ''))
    if (mana) accumulator.mana = mana
  }

  if (strChunk) {
    const strength = parseToRange(strChunk.replace(STR_TOKEN, ''))
    if (strength) accumulator.strength = strength
  }

  if (movChunk) {
    const value = movChunk.replace(MOV_TOKEN, '')
    if (value === 'fixed') accumulator.fixedMovement = true
    else {
      const movement = parseToRange(value)
      if (movement) accumulator.movement = movement
    }
  }

  if (hasChunk) {
    const ability = hasChunk.replace(HAS_TOKEN, '').toUpperCase()
    if (ability) accumulator.ability = ability
  }

  return is.reduce((acc, chunk) => {
    const term = chunk.replace(IS_TOKEN, '')
    const [key, value] = parseCardGuess(term)
    if (key) acc[key] = value
    return acc
  }, accumulator)
}

export const serializeFilters = filters => {
  let search = []

  if (filters.hero) search.push('is:hero')
  if (filters.elder) search.push('is:elder')
  if (filters.ancient) search.push('is:ancient')
  if (filters.text) search.push(filters.text)
  if (filters.fixedMovement) search.push('mov:fixed')
  if (filters.faction !== '*') search.push('is:' + filters.faction)
  if (filters.race !== '*') search.push('is:' + filters.race)
  if (filters.type !== '*') search.push('is:' + filters.type)
  if (filters.rarity !== '*') search.push('is:' + filters.rarity)
  if (filters.movement !== '*') search.push('mov:' + filters.movement)
  if (filters.mana !== '*') search.push('mana:' + filters.mana)
  if (filters.ability !== '*')
    search.push('has:' + filters.ability.toLowerCase())

  return search.join(' ')
}

export default parseAdvancedSearch
