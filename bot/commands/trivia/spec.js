import command from './index.js'
import {
  mockInteraction,
  mockChannel,
  mockGuild,
  mockUser,
  client,
} from '#helpers/jestSetup/discord'

describe('Bot — /trivia', () => {
  afterEach(() => {
    client.guilds.cache.clear()
    client.channels.cache.clear()
  })

  it('should be possible to display scores', async () => {
    const channel = mockChannel({ name: 'trivia' })
    const guild = mockGuild({ id: '714858253531742208' })
    const interaction = mockInteraction(
      { subcommand: 'scores' },
      { channel, guild }
    )

    client.channels.cache.set(channel.id, channel)
    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeFalsy()
    expect(embed.title).toBe('🏅 Trivia scores')
  })

  it('should be possible to display one’s score', async () => {
    const member = mockUser({ username: 'Kitty' })
    const channel = mockChannel({ name: 'trivia' })
    const guild = mockGuild({ id: '714858253531742208' })
    const interaction = mockInteraction(
      { subcommand: 'score' },
      { channel, guild, member }
    )

    client.channels.cache.set(channel.id, channel)
    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🏅 Trivia score')
  })

  it('should be possible to start a card trivia', async () => {
    const member = mockUser({ username: 'Kitty' })
    const channel = mockChannel({ name: 'trivia' })
    const guild = mockGuild()
    const interaction = mockInteraction(
      { subcommand: 'card' },
      { channel, guild, member }
    )

    client.channels.cache.set(channel.id, channel)
    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeFalsy()
    expect(embed.title).toContain('Card trivia started')
    expect(embed.description).toBeTruthy()
    expect(embed.fields[0].name).toBe('Initiator')
    expect(embed.fields[0].inline).toBe(true)
    expect(embed.fields[1]).toEqual({
      name: 'Duration',
      value: '75 seconds',
      inline: true,
    })
  })

  it('should be possible to start a question trivia', async () => {
    const member = mockUser({ username: 'Kitty' })
    const channel = mockChannel({ name: 'trivia' })
    const guild = mockGuild()
    const interaction = mockInteraction(
      { subcommand: 'question' },
      { channel, guild, member }
    )

    client.channels.cache.set(channel.id, channel)
    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeFalsy()
    expect(embed.title).toContain('?')
    expect(embed.description).toBeTruthy()
    expect(embed.fields[0].name).toBe('Initiator')
    expect(embed.fields[0].inline).toBe(true)
    expect(embed.fields[1]).toEqual({
      name: 'Duration',
      value: '15 seconds',
      inline: true,
    })
  })

  it('should be possible to start an image trivia', async () => {
    const member = mockUser({ username: 'Kitty' })
    const channel = mockChannel({ name: 'trivia' })
    const guild = mockGuild()
    const interaction = mockInteraction(
      { subcommand: 'image' },
      { channel, guild, member }
    )

    client.channels.cache.set(channel.id, channel)
    client.guilds.cache.set(guild.id, guild)

    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeFalsy()
    expect(embed.title).toContain('Image trivia started')
    expect(embed.description).toBeTruthy()
    expect(output.files).toHaveLength(1)
    expect(embed.fields[0].name).toBe('Initiator')
    expect(embed.fields[0].inline).toBe(true)
    expect(embed.fields[1]).toEqual({
      name: 'Duration',
      value: '75 seconds',
      inline: true,
    })
  })
})
