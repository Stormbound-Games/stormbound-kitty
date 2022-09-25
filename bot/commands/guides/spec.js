import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /guides', () => {
  it('should return a specific guide if found', async () => {
    const interaction = mockInteraction({ input: 'green' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'https://stormbound-kitty.com/guides/green-prototypes'
    )
  })

  it('should return an error if no guides were found for the input', async () => {
    const interaction = mockInteraction({ input: 'sdfsf' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🧭 Guides')
    expect(embed.url).toBe('https://stormbound-kitty.com/guides')
    expect(embed.description).toBe('Could not find a guide matching “sdfsf”.')
  })

  it('should return all guides without an input', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🧭 Guides')
    expect(embed.url).toBe('https://stormbound-kitty.com/guides')
    expect(embed.description).toContain('**Essential Guides**')
    expect(embed.description).toContain('**Playstyle Guides**')
    expect(embed.description).toContain('**In-depth Guides**')
  })
})
