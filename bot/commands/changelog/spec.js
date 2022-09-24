import command from './index.js'
import {
  client,
  mockInteraction,
  mockAutocomplete,
} from '#helpers/jestSetup/discord.js'

describe('Bot — /changelog', () => {
  it('should return an error for a missing/invalid card', async () => {
    const interaction = mockInteraction({ card: 'dfsfsd' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🛠 Card Changelog')
    expect(embed.url).toBe('https://stormbound-kitty.com/changelog')
    expect(embed.description).toBe('Could not find a card matching “dfsfsd”.')
  })

  it('should return the changes for a card', async () => {
    const interaction = mockInteraction({ card: 'N19' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🛠 Card Changelog')
    expect(embed.url).toBe('https://stormbound-kitty.com/cards/N19')
    expect(embed.fields).toHaveLength(1)
    expect(embed.fields[0]).toEqual({
      name: 'Sep 18th, 2017',
      value: '- Released with the game',
    })
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
