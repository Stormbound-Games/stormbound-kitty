import command from './index.js'
import { client, mockInteraction } from '#helpers/jestSetup/discord.js'

describe('Bot — /deckadvice', () => {
  it('should return an error for a missing id', async () => {
    const interaction = mockInteraction({ deck: '' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'There was an error evaluating the given deck ID.'
    )
  })

  it('should return an error for an invalid id', async () => {
    const interaction = mockInteraction({ deck: 'sdfsf' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'There was an error evaluating some of the cards.'
    )
  })

  it('should return advice for a given deck', async () => {
    const interaction = mockInteraction({
      deck: '5n35n125n163w54n184w95w125w133n394w153w194w21',
    })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toContain('Deck Advice')
    expect(embed.url).toContain(
      'https://stormbound-kitty.com/deck/5n35n125n163w54n184w95w125w133n394w153w194w21/detail'
    )
    expect(embed.fields.length).toBeGreaterThan(0)
  })
})
