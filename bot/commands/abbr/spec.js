import command from './index.js'
import { client, mockInteraction } from '#helpers/jestSetup/discord.js'

describe('Bot — /abbr', () => {
  it('should return an error for a missing/invalid term', async () => {
    const interaction = mockInteraction({ abbr: 'dfsfsd' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('❔ Abbreviation')
    expect(embed.url).toBe('https://stormbound-kitty.com/lexicon')
    expect(embed.description).toBe(
      'Could not find any match for abbreviation “dfsfsd”.'
    )
  })

  it('should handle an abbreviation with a single definition', async () => {
    const interaction = mockInteraction({ abbr: 'VotM' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('❔ Abbreviation')
    expect(embed.url).toBe('https://stormbound-kitty.com/lexicon')
    expect(embed.description).toBe('“VotM” might mean “Victors of the Melee”.')
  })

  it('should discard casing entirely', async () => {
    const interaction = mockInteraction({ abbr: 'aoe' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.description).toBe('“aoe” might mean “Area of Effect”.')
  })

  it('should handle an abbreviation with multiple definitions', async () => {
    const interaction = mockInteraction({ abbr: 'fs' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.description).toBe(
      '“fs” might mean “Final Sacrifice”, “Flaming Stream”, “Feral Shamans”, “Forgotten Souls”, or “Fusion Stones”.'
    )
  })
})
