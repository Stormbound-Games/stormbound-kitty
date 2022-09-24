import command from './index.js'
import {
  mockInteraction,
  mockGuild,
  mockUser,
  client,
} from '#helpers/jestSetup/discord'

describe('Bot — /gameid', () => {
  it('should return one’s game ID', async () => {
    const guild = mockGuild()
    const user = mockUser()
    const interaction = mockInteraction({}, { guild, user })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe('Your game ID is not recorded yet.')
  })

  it('should set one’s game ID', async () => {
    const guild = mockGuild()
    const user = mockUser({ username: 'foo' })
    const interaction = mockInteraction({ game_id: 'foobar' }, { guild, user })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe('Your game ID (foobar) has been recorded.')
  })

  it('should read one’s game ID', async () => {
    const guild = mockGuild()
    const user = mockUser()
    const member = mockUser({ username: 'foo' })
    const interaction = mockInteraction({ member }, { guild, user })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe('foo’s game ID is not recorded yet.')
  })
})
