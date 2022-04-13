import capitalize from '~/helpers/capitalize'

const formatCardStats = state => {
  const faction = capitalize(state.faction)
  const type = capitalize(state.type)
  const name = capitalize(state.name)
  const rarity = capitalize(state.rarity)
  const race = capitalize(state.race || '')
  const ability = capitalize(state.ability.display || '')
  const mana = `${state.mana.display} mana`
  const strength =
    state.type !== 'spell' ? `${state.strength.display} strength` : ''
  const movement = state.type === 'unit' ? `${state.movement} movement` : ''
  const modifiers = [
    state.ancient ? 'Ancient' : '',
    state.elder ? 'Elder' : '',
    state.hero ? 'Hero' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return [
    `${name}: ${faction} ${type}`,
    `${rarity}${race ? ` ${race} ` : ' '}${modifiers}`,
    state.level && `At level ${state.level}:`,
    [mana, strength, movement].filter(Boolean).join(' · '),
    ability,
  ]
    .filter(Boolean)
    .join('\n')
}

export default formatCardStats
