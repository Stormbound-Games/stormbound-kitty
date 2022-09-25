import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /randomcard', () => {
  it('should return a random card', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/cards\/\w+$/
    )
  })

  it('should return a random card of a specific faction', async () => {
    const interaction = mockInteraction({ faction: 'ironclad' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^https:\/\/stormbound-kitty.com\/cards\/I\d+$/
    )
  })

  it('should return a random card of a specific type', async () => {
    const interaction = mockInteraction({ type: 'spell' })
    const output = await command.execute(interaction, client)
    const ID = output.content.replace('https://stormbound-kitty.com/cards/', '')
    const card = client.cards.get(ID)

    expect(output.ephemeral).toBeTruthy()
    expect(card.type).toMatch('spell')
  })

  it('should return a random card of a specific rarity', async () => {
    const interaction = mockInteraction({ rarity: 'rare' })
    const output = await command.execute(interaction, client)
    const ID = output.content.replace('https://stormbound-kitty.com/cards/', '')
    const card = client.cards.get(ID)

    expect(output.ephemeral).toBeTruthy()
    expect(card.rarity).toMatch('rare')
  })

  it('should return a random card of a specific unit type', async () => {
    const interaction = mockInteraction({ unit_type: 'dwarf' })
    const output = await command.execute(interaction, client)
    const ID = output.content.replace('https://stormbound-kitty.com/cards/', '')
    const card = client.cards.get(ID)

    expect(output.ephemeral).toBeTruthy()
    expect(card.unitTypes).toContain('dwarf')
  })

  it('should handle multiple filters', async () => {
    const interaction = mockInteraction({
      faction: 'neutral',
      unit_type: 'dwarf',
    })
    const output = await command.execute(interaction, client)
    const ID = output.content.replace('https://stormbound-kitty.com/cards/', '')
    const card = client.cards.get(ID)

    expect(output.ephemeral).toBeTruthy()
    expect(card.faction).toContain('neutral')
    expect(card.unitTypes).toContain('dwarf')
  })

  it('should return an error for invalid parameters', async () => {
    const interaction = mockInteraction({
      faction: 'shadowfen',
      unit_type: 'dwarf',
    })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('🃏 Random Card')
    expect(embed.description).toBe(
      'Could not find a card matching shadowfen, dwarf.'
    )
  })
})
