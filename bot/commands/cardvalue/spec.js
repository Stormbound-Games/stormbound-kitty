import command from './index.js'
import {
  client,
  mockInteraction,
  mockAutocomplete,
} from '#helpers/jestSetup/discord.js'

describe('Bot — /cardvalue', () => {
  it('should return an error for a missing/invalid card', async () => {
    const interaction = mockInteraction({ card: 'dfsfsd' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('⚖️ Card Value')
    expect(embed.url).toBe('https://stormbound-kitty.com/calculators/value')
    expect(embed.description).toBe('Could not find a card matching “dfsfsd”.')
  })

  it('should return an error for a card whose value cannot be determined', async () => {
    const interaction = mockInteraction({ card: 'I2' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('⚖️ Card Value')
    expect(embed.url).toBe('https://stormbound-kitty.com/calculators/value')
    expect(embed.description).toBe(
      'It is not possible to efficiently compute the value of Doctor Mia.'
    )
  })

  it('should return the value for a card, defaulting to level 1', async () => {
    const interaction = mockInteraction({ card: 'N6' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('⚖️ Card Value')
    expect(embed.url).toBe('https://stormbound-kitty.com/calculators/value/1n6')
    expect(embed.description).toBe(
      'The estimated value for Spare Dragonling at level 1 for a single turn is between 0.50 and 2.00, averaging at 1.25.'
    )
  })

  it('should use the level if passed', async () => {
    const interaction = mockInteraction({ card: 'N6', level: 5 })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('⚖️ Card Value')
    expect(embed.url).toBe('https://stormbound-kitty.com/calculators/value/5n6')
    expect(embed.description).toBe(
      'The estimated value for Spare Dragonling at level 5 for a single turn is between 0.50 and 4.00, averaging at 2.25.'
    )
  })

  it('should handle static-value cards differently', async () => {
    const interaction = mockInteraction({ card: 'N3' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('⚖️ Card Value')
    expect(embed.url).toBe('https://stormbound-kitty.com/calculators/value/1n3')
    expect(embed.description).toBe(
      'The estimated value for Gifted Recruits at level 1 for a single turn is 0.50.'
    )
  })

  it('should autocomplete the card ID from an abbreviation', async () => {
    const filters = await command.autocomplete(mockAutocomplete('votm'), client)
    expect(filters).toHaveLength(1)
    expect(filters[0].name).toBe('Victors of the Melee')
  })

  it('should autocomplete the card ID from a fuzzy name', async () => {
    const filters = await command.autocomplete(
      mockAutocomplete('victor'),
      client
    )
    expect(filters).toHaveLength(1)
    expect(filters[0].name).toBe('Victors of the Melee')
  })
})
