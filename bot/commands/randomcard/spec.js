import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'
import serialization from '#helpers/serialization'

describe('Bot — /randomcard', () => {
  beforeAll(() => {
    client.SKIP_MINIFICATION = true
  })

  afterAll(() => {
    delete client.SKIP_MINIFICATION
  })

  it('should return a random card', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(/^https:\/\/stormbound-kitty.com\/card\//)
  })

  it('should return a random card of the specified faction', async () => {
    const interaction = mockInteraction({ faction: 'shadowfen' })
    const output = await command.execute(interaction, client)
    const id = output.content.replace('https://stormbound-kitty.com/card/', '')
    const card = serialization.card.deserialize(global.__CARDS_INDEX__, id)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(/^https:\/\/stormbound-kitty.com\/card\//)
    expect(card.faction).toBe('shadowfen')
  })

  it('should return a random card of the specified type', async () => {
    const interaction = mockInteraction({ type: 'structure' })
    const output = await command.execute(interaction, client)
    const id = output.content.replace('https://stormbound-kitty.com/card/', '')
    const card = serialization.card.deserialize(global.__CARDS_INDEX__, id)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(/^https:\/\/stormbound-kitty.com\/card\//)
    expect(card.type).toBe('structure')
  })

  it('should return a random card of the specified type and faction', async () => {
    const interaction = mockInteraction({ type: 'structure', faction: 'swarm' })
    const output = await command.execute(interaction, client)
    const id = output.content.replace('https://stormbound-kitty.com/card/', '')
    const card = serialization.card.deserialize(global.__CARDS_INDEX__, id)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(/^https:\/\/stormbound-kitty.com\/card\//)
    expect(card.type).toBe('structure')
    expect(card.faction).toBe('swarm')
  })
})
