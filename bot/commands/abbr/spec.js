import command from './index.js'
import { client, mockInteraction } from '#helpers/jestSetup/discord.js'

describe('Bot — /abbr', () => {
  it('should return an error for a missing/invalid term', async () => {
    const interaction = mockInteraction({ abbr: 'dfsfsd' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'Could not find any match for abbreviation “dfsfsd”.'
    )
  })

  it('should handle an abbreviation with a single definition', async () => {
    const interaction = mockInteraction({ abbr: 'VotM' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('“VotM” might mean “Victors of the Melee”.')
  })

  it('should discard casing entirely', async () => {
    const interaction = mockInteraction({ abbr: 'aoe' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('“aoe” might mean “Area of Effect”.')
  })

  it('should handle an abbreviation with multiple definitions', async () => {
    const interaction = mockInteraction({ abbr: 'fs' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      '“fs” might mean “Final Sacrifice”, “Flaming Stream”, “Feral Shamans”, “Forgotten Souls”, or “Fusion Stones”.'
    )
  })
})
