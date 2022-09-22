import command from './index.js'
import { client, mockInteraction } from '#helpers/jestSetup/discord.js'

describe('Bot — /bookodds', () => {
  it('should return an error if no book was given/found', async () => {
    const interaction = mockInteraction({
      book_type: 'foobar',
      target: 'FUSION_STONES',
    })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe('Could not find a book matching “foobar”.')
  })

  it('should return odds for Fusion Stones', async () => {
    const interaction = mockInteraction({
      book_type: 'MYTHIC',
      target: 'FUSION_STONES',
    })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'A **Mythic Tome** has 10% chance of drawing **Fusion Stones**.'
    )
  })

  it('should return odds for a different target', async () => {
    const interaction = mockInteraction({
      book_type: 'MYTHIC',
      target: 'SPECIFIC_LEGENDARY',
    })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^A \*\*Mythic Tome\*\* has \d+\.\d\d% chance of drawing \*\*a specific Legendary\*\*.$/
    )
  })

  it('should return odds for no target', async () => {
    const interaction = mockInteraction({
      book_type: 'HEROIC',
      target: '',
    })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toMatch(
      /^A \*\*Heroic Tome\*\* has a static 10% chance of drawing \*\*Fusion Stones\*\*, an estimated \d+\.\d\d\/\d+\.\d\d\/\d+\.\d\d\/\d+\.\d\d% chance of drawing \*\*a specific card\*\* and an estimated \d+\.\d\d\/\d+\.\d\d\/\d+\.\d\d\/\d+\.\d\d% chance of drawing \*\*any card\*\*.$/
    )
  })
})
