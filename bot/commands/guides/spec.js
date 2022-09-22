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

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('Could not find a guide matching “sdfsf”.')
  })

  it('should return all guides without an input', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toContain('**Essential Guides**')
    expect(output.content).toContain('**Playstyle Guides**')
    expect(output.content).toContain('**In-depth Guides**')
  })
})
