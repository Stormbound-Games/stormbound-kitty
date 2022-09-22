import command from './index.js'
import {
  mockInteraction,
  mockGuild,
  mockRole,
  mockUser,
  client,
} from '#helpers/jestSetup/discord'

describe('Bot — /role', () => {
  it('should be possible to add a role', async () => {
    const role = mockRole({ name: 'Diamond' })
    const user = mockUser({ roles: [] })
    const guild = mockGuild({ roles: [role] })
    const interaction = mockInteraction({ role }, { guild, user })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('“Diamond” role added.')
  })

  it('should be possible to remove a role', async () => {
    const role = mockRole({ name: 'Diamond' })
    const user = mockUser({ roles: [role] })
    const guild = mockGuild({ roles: [role] })
    const interaction = mockInteraction({ role }, { guild, user })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('“Diamond” role removed.')
  })

  it('should return an error for an invalid role', async () => {
    const role = mockRole({ name: 'Moderator' })
    const user = mockUser({ roles: [role] })
    const guild = mockGuild({ roles: [role] })
    const interaction = mockInteraction({ role }, { guild, user })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('The “Moderator” role cannot be self-assigned.')
  })
})
