import command from './'
const role = command.handler.bind(command)

const guild = { roles: new Map() }
guild.roles.set('__di', { id: '__di', name: 'Diamond' })
guild.roles.set('__pl', { id: '__pl', name: 'Platinum' })
guild.roles.set('__go', { id: '__go', name: 'Gold' })
guild.roles.set('__si', { id: '__si', name: 'Silver' })
guild.roles.set('__br', { id: '__br', name: 'Bronze' })
guild.roles.set('__ir', { id: '__ir', name: 'Iron' })
guild.roles.set('__st', { id: '__st', name: 'Starter' })
guild.roles.set('__sw', { id: '__sw', name: 'Swarm' })
guild.roles.set('__ic', { id: '__ic', name: 'Ironclad' })
guild.roles.set('__sf', { id: '__sf', name: 'Shadowfen' })
guild.roles.set('__nt', { id: '__nt', name: 'Neutral' })
guild.roles.set('__wp', { id: '__wp', name: 'Winter' })
guild.roles.set('__to', { id: '__to', name: 'Tournamentee' })
guild.roles.set('__st', { id: '__st', name: 'Streambound' })
guild.roles.cache = {}
guild.roles.cache.find = cb => {
  let result = null
  guild.roles.forEach((value, key) => {
    if (cb(value)) result = value
  })
  return result
}

const member = { roles: new Map() }
member.roles.cache = {}
member.roles.add = role => member.roles.set(role.id, role)
member.roles.remove = role => member.roles.delete(role.id)
member.roles.cache.find = cb => {
  let result = null
  member.roles.forEach((value, key) => {
    if (cb(value)) result = value
  })
  return result
}

const cmd = message => {
  const content = '!role ' + message

  return role(message, {}, { guild, member, content })
}

describe('Bot — !role', () => {
  it('should return nothing for a missing term', () => {
    return cmd('').then(output => expect(output).to.equal(undefined))
  })

  it('should return nothing for a no-match', () => {
    return cmd('flksdjf').then(output => expect(output).to.equal(undefined))
  })

  it('should be possible to add a role', () => {
    return cmd('diamond').then(output => {
      expect(output.description).to.contain('“Diamond” role added')
    })
  })

  it('should be possible to update one’s role', () => {
    return cmd('platinum').then(output => {
      expect(output.description).to.contain('“Diamond” role removed')
      expect(output.description).to.contain('“Platinum” role added')
    })
  })

  it('should be possible to remove one’s role', () => {
    return cmd('platinum').then(output =>
      expect(output.description).to.contain('“Platinum” role removed')
    )
  })

  it('should be possible to assign tournamentee role', () => {
    return cmd('tournamentee').then(output =>
      expect(output.description).to.contain('“Tournamentee” role added')
    )
  })

  it('should be possible to assign streambound role', () => {
    return cmd('streambound').then(output =>
      expect(output.description).to.contain('“Streambound” role added')
    )
  })
})
