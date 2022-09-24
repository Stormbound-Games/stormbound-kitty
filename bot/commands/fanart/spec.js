import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /fanart', () => {
  it('should return a random fanart', async () => {
    const interaction = mockInteraction()
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toBe('👩‍🎨  Fan-art')
    expect(embed.url).toMatch(/^https:\/\/stormbound\-kitty\.com\/members\//)
    expect(embed.fields).toHaveLength(2)
    expect(embed.fields[0].name).toBe('author')
    expect(embed.fields[1].name).toBe('date')
    expect(embed.image.url).toMatch(
      /https:\/\/cdn\.sanity\.io\/images\/5hlpazgd\/production\/[^.]+\.[a-z]{3}$/
    )
  })
})
