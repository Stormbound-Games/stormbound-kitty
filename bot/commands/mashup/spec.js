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

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^Here is your mashup: \*\*(Green Neglects|Erratic Prototypes)\*\*$/
    )
  })
})
