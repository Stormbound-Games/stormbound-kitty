import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /puzzle', () => {
  it('should return a random puzzle', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/puzzles\/[a-z0-9-]+$/
    )
  })
})
