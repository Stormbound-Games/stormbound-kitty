import command from './index.js'
import {
  mockInteraction,
  mockGuild,
  mockUser,
  client,
} from '#helpers/jestSetup/discord'

describe('Bot — /gameid', () => {
  const guild = mockGuild({ id: '714858253531742208' })
  const gameId = '123456789'
  const kitty = mockUser({ id: '368097495605182483', username: 'Kitty' })

  it('should set one’s game ID', async () => {
    const interaction = mockInteraction(
      { game_id: gameId },
      { guild, user: kitty }
    )
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe(
      `Your game ID (${gameId}) has been recorded.`
    )
  })

  it('should return an error if one’s game ID is not defined', async () => {
    const interaction = mockInteraction({}, { guild, user: kitty })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe(`Your game ID is ${gameId}.`)
  })

  it('should return an error if one’s game ID is not defined', async () => {
    const user = mockUser()
    const interaction = mockInteraction({}, { guild, user })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe(`Your game ID is not recorded yet.`)
  })

  it('should read one’s game ID', async () => {
    const user = mockUser()
    const interaction = mockInteraction({ member: kitty }, { guild, user })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎮 Game ID')
    expect(embed.description).toBe('Kitty’s game ID is 123456789.')
  })
})
