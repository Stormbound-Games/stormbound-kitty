import Discord from 'discord.js'

export const client = {
  abbreviations: new Discord.Collection(
    Object.entries(global.__ABBREVIATIONS__)
  ),
  books: new Discord.Collection(Object.entries(global.__BOOKS_INDEX__)),
  brawls: new Discord.Collection(
    global.__BRAWLS__.map(brawl => [brawl.id, brawl])
  ),
  cards: new Discord.Collection(Object.entries(global.__CARDS_INDEX__)),
}

export const mockChannel = (options = {}) => ({
  id: options.id || Discord.SnowflakeUtil.generate(),
  name: options.name || 'testChannel',
  createMessageCollector: jest.fn(() => ({
    on: jest.fn(),
  })),
  send: jest.fn(v => v),
})

export const mockUser = (options = {}) => {
  const roles = new Set(options.roles)
  roles.remove = roles.delete
  roles.cache = new Discord.Collection(
    (options.roles ?? []).map(role => [role.name, role])
  )

  return {
    id: options.id || Discord.SnowflakeUtil.generate(),
    username: options.username || 'testUser',
    roles,
  }
}

export const mockGuild = (options = {}) => {
  const roles = new Set(options.roles)
  roles.cache = new Discord.Collection(
    (options.roles ?? []).map(role => [role.name, role])
  )

  return {
    id: options.id || Discord.SnowflakeUtil.generate(),
    roles,
  }
}

export const mockRole = (options = {}) => ({
  id: options.id || Discord.SnowflakeUtil.generate(),
  name: options.name || 'testRole',
})

export const mockInteraction = (parameters = {}, options = {}) => ({
  channel: options.channel,
  member: options.member || options.user,
  user: options.user || options.member,
  guild: options.guild,
  options: {
    getInteger: jest.fn(key => parameters[key]),
    getString: jest.fn(key => parameters[key]),
    getUser: jest.fn(key => parameters[key]),
    getRole: jest.fn(key => parameters[key]),
    getFocused: jest.fn(() => parameters),
    getSubcommand: jest.fn(() => parameters.subcommand),
  },
  reply: jest.fn(v => v),
})

export const mockAutocomplete = input => ({
  options: {
    getFocused: jest.fn(() => input),
  },
  respond: jest.fn(v => v),
})
