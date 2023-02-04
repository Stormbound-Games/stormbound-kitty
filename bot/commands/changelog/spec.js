import command from './index.js'
import { client, mockInteraction } from '#helpers/jestSetup/discord.js'

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
    expect(embed.fields).toHaveLength(2)
    expect(embed.fields.at(-1)).toEqual({
      name: 'Sep 18th, 2017',
      value: '- Released with the game',
    })
  })
})
