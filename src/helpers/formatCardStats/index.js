import capitalize from '~/helpers/capitalize'

const formatCardStats = state => {
  const faction = capitalize(state.faction)
  const type = capitalize(state.type)
  const name = capitalize(state.name)
  const rarity = capitalize(state.rarity)
  const unitTypes = state.unitTypes.map(capitalize).join(' ')
  const ability = capitalize(state.ability.display || '')
  const mana = `${state.mana.display} mana`
  const strength =
    state.type !== 'spell' ? `${state.strength.display} strength` : ''
  let movement = state.type === 'unit' ? `${state.movement} movement` : ''
  if (state.fixedMovement) {
    movement += ' (fixedly forward)'
  }

  return [
    `${name}: ${faction} ${type}`,
    `${rarity} ${unitTypes}`,
    state.level && `At level ${state.level}:`,
    [mana, strength, movement].filter(Boolean).join(' · '),
    ability,
  ]
    .filter(Boolean)
    .join('\n')
}

export default formatCardStats
