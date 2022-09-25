import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'
import getFactionFromDeckID from '#helpers/getFactionFromDeckID'

describe('Bot — /suggestdeck', () => {
  it('should return a random suggested deck', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/deck\/\w+$/
    )
  })

  it('should return a random suggested deck of the given faction', async () => {
    const interaction = mockInteraction({ faction: 'swarm' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/deck\/\w+$/
    )
    expect(
      getFactionFromDeckID(
        output.content.replace('https://stormbound-kitty.com/deck/', '')
      )
    ).toBe('swarm')
  })

  it('should not return Brawl or Equals decks', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)
    const ID = output.content.replace('https://stormbound-kitty.com/deck/', '')
    const deck = global.__DECKS_INDEX__[ID]

    expect(deck.tags).not.toContain('BRAWL')
    expect(deck.tags).not.toContain('EQUALS')
  })
})
