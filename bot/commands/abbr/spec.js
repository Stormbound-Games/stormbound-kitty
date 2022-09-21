import command from './index.js'

const mockInteraction = value => ({
  options: { getString: jest.fn(() => value) },
  reply: jest.fn(),
})

describe('Bot — !abbr', () => {
  it('should return nothing for a missing/invalid term', async () => {
    const interaction = mockInteraction('dfsfsd')

    await command.execute(interaction)

    expect(interaction.reply).toHaveBeenCalledWith({
      content: `Could not find any match for abbreviation “dfsfsd”.`,
      ephemeral: true,
    })
  })

  it('should handle an abbreviation with a single definition', async () => {
    const interaction = mockInteraction('VotM')

    await command.execute(interaction)

    expect(interaction.reply).toHaveBeenCalledWith({
      content: `“VotM” might mean “Victors of the Melee”.`,
      ephemeral: true,
    })
  })

  it('should discard casing entirely', async () => {
    const interaction = mockInteraction('aoe')

    await command.execute(interaction)

    expect(interaction.reply).toHaveBeenCalledWith({
      content: `“aoe” might mean “Area of Effect”.`,
      ephemeral: true,
    })
  })

  it('should handle an abbreviation with multiple definitions', async () => {
    const interaction = mockInteraction('fs')

    await command.execute(interaction)

    expect(interaction.reply).toHaveBeenCalledWith({
      content: `“fs” might mean “Final Sacrifice”, “Flaming Stream”, “Feral Shamans”, “Forgotten Souls”, or “Fusion Stones”.`,
      ephemeral: true,
    })
  })
})
