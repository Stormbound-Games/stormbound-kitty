import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /story', () => {
  it('should return a specific guide if found', async () => {
    const interaction = mockInteraction({ input: 'mia' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'https://stormbound-kitty.com/stories/doctor-mia'
    )
  })

  it('should return an error if no story was found for the input', async () => {
    const interaction = mockInteraction({ input: 'sdfsf' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('📝 Story')
    expect(embed.url).toBe('https://stormbound-kitty.com/stories')
    expect(embed.description).toBe('Could not find a story matching “sdfsf”.')
  })

  it('should return a random story without an input', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/stories\/[a-z0-9-]+$/
    )
  })
})
