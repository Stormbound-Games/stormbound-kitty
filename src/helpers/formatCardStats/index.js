import capitalise from '~/helpers/capitalise'

const formatCardStats = state => {
  const faction = capitalise(state.faction)
  const type = capitalise(state.type)
  const name = capitalise(state.name)
  const rarity = capitalise(state.rarity)
  const race = capitalise(state.race || '')
  const ability = capitalise(state.ability.display || '')
  const mana = `${state.mana.display} mana`
  const strength =
    state.type !== 'spell' ? `${state.strength.display} strength` : ''
  const movement = state.type === 'unit' ? `${state.movement} movement` : ''
  const modifiers = [state.elder ? 'Elder' : '', state.hero ? 'Hero' : '']
    .filter(Boolean)
    .join(' ')

  return [
    `${name}: ${faction} ${type}`,
    `${rarity}${race ? ` · ${race} ` : ' '}${modifiers}`,
    state.level && `At level ${state.level}:`,
    [mana, strength, movement].filter(Boolean).join(' · '),
    ability,
  ]
    .filter(Boolean)
    .join('\n')
}

export default formatCardStats
