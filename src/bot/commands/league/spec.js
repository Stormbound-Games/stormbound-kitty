import command from './'
const league = command.handler

const guild = { roles: new Map() }
guild.roles.set('__d', { id: '__d', name: 'Diamond' })
guild.roles.set('__p', { id: '__p', name: 'Platinum' })
guild.roles.set('__g', { id: '__g', name: 'Gold' })
guild.roles.set('__s', { id: '__s', name: 'Silver' })
guild.roles.set('__b', { id: '__b', name: 'Bronze' })
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
  const content = '!league ' + message

  return league(message, {}, { guild, member, content })
}

describe('Bot — !league', () => {
  it('should return nothing for a missing term', () => {
    return cmd('').then(output => expect(output).to.equal(undefined))
  })

  it('should return nothing for a no-match', () => {
    return cmd('flksdjf').then(output => expect(output).to.equal(undefined))
  })

  it('should be possible to add a role', () => {
    return cmd('diamond').then(output => {
      expect(output).to.contain('“Diamond” league added')
    })
  })

  it('should be possible to update one’s role', () => {
    return cmd('platinum').then(output => {
      expect(output).to.contain('“Diamond” league removed')
      expect(output).to.contain('“Platinum” league added')
    })
  })

  it('should be possible to remove one’s role', () => {
    return cmd('platinum').then(output =>
      expect(output).to.contain('“Platinum” league removed')
    )
  })
})
