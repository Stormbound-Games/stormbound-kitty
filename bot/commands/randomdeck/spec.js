import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'
import getFactionFromDeckID from '#helpers/getFactionFromDeckID'

describe('Bot — /randomdeck', () => {
  it('should return a random deck', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/deck\/\w+$/
    )
  })

  it('should return a random deck of the specified faction', async () => {
    const interaction = mockInteraction({ faction: 'shadowfen' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/deck\/\w+$/
    )
    expect(
      getFactionFromDeckID(
        output.content.replace('https://stormbound-kitty.com/deck/', '')
      )
    ).toBe('shadowfen')
  })

  it('should return a random deck of the specified faction, even if neutral', async () => {
    const interaction = mockInteraction({ faction: 'neutral' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/deck\/\w+$/
    )
    expect(
      getFactionFromDeckID(
        output.content.replace('https://stormbound-kitty.com/deck/', '')
      )
    ).toBe('neutral')
  })

  it('should include specific cards', async () => {
    const interaction = mockInteraction({ including: 'mia' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/deck\/\w+$/
    )
    expect(output.content).toContain('i2')
  })

  it('should return an error for invalid parameters', async () => {
    const interaction = mockInteraction({ faction: 'winter', including: 'mia' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🎲 Random Deck')
    expect(embed.url).toBe('https://stormbound-kitty.com/deck')
    expect(embed.description).toBe(
      'There was an issue generating a random deck. This might be because of conflicting argument (e.g. `winter` + `rof`, `fc, mia`…).'
    )
  })
})
