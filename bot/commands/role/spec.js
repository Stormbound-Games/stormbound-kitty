import command from './index.js'
import {
  mockInteraction,
  mockGuild,
  mockRole,
  mockUser,
  client,
} from '#helpers/jestSetup/discord'

describe('Bot — /role', () => {
  afterEach(() => {
    client.guilds.cache.clear()
  })

  it('should be possible to add a role', async () => {
    const role = mockRole({ name: 'Diamond' })
    const user = mockUser({ roles: [] })
    const guild = mockGuild({ roles: [role] })
    const interaction = mockInteraction({ role: 'Diamond' }, { guild, user })

    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🌟 Role Assignment')
    expect(embed.description).toBe('“Diamond” role added.')
  })

  it('should be possible to remove a role', async () => {
    const role = mockRole({ name: 'Diamond' })
    const user = mockUser({ roles: [role] })
    const guild = mockGuild({ roles: [role] })
    const interaction = mockInteraction({ role: 'Diamond' }, { guild, user })

    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🌟 Role Assignment')
    expect(embed.description).toBe('“Diamond” role removed.')
  })

  it('should return an error for an invalid role', async () => {
    const role = mockRole({ name: 'Moderator' })
    const user = mockUser({ roles: [role] })
    const guild = mockGuild({ roles: [role] })
    const interaction = mockInteraction({ role: 'Moderator' }, { guild, user })

    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🌟 Role Assignment')
    expect(embed.description).toBe(
      'The “Moderator” role cannot be self-assigned.'
    )
  })
})
