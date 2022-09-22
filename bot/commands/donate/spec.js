import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /donate', () => {
  it('should return information about supporting the site/bot', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(/Discord/i)
    expect(output.content).toMatch(/Stormbound-Kitty/i)
    expect(output.content).toMatch(/donat/i)
  })
})
