import command from './index.js'
import {
  client,
  mockInteraction,
  mockAutocomplete,
} from '#helpers/jestSetup/discord.js'

describe('Bot — /cardinfo', () => {
  it('should return an error for a missing/invalid card', async () => {
    const interaction = mockInteraction({ card: 'dfsfsd' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('Could not find a card matching “dfsfsd”.')
  })

  it('should return a link for a valid card ID', async () => {
    const interaction = mockInteraction({ card: 'N1' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('https://stormbound-kitty.com/cards/N1')
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
