import command from './index.js'
import { mockInteraction } from '#helpers/jestSetup/discord'

describe('Bot — /mashup', () => {
  it('should return a random card mashup', async () => {
    const interaction = mockInteraction('dfsfsd')
    const output = await command.execute(interaction, {
      cards: new Map([
        [global.__CARDS__[0].id, global.__CARDS__[0]],
        [global.__CARDS__[1].id, global.__CARDS__[1]],
      ]),
    })
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🤪 Card Mashup')
    expect(embed.description).toMatch(
      /^Here is your mashup: \*\*(Green Neglects|Erratic Prototypes)\*\*$/
    )
  })
})
