import command from './index.js'
import { client, mockInteraction } from '#helpers/jestSetup/discord.js'

describe('Bot — /cardinfo', () => {
  it('should return an error for a missing/invalid card', async () => {
    const interaction = mockInteraction({ card: 'dfsfsd' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('⚡️ Card Info')
    expect(embed.url).toBe('https://stormbound-kitty.com/card')
    expect(embed.description).toBe('Could not find a card matching “dfsfsd”.')
  })

  it('should return a link for a valid card ID', async () => {
    const interaction = mockInteraction({ card: 'N1' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('https://stormbound-kitty.com/cards/N1')
  })
})
