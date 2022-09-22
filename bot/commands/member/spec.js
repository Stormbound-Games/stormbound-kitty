import command from './index.js'
import { mockInteraction, client } from '#helpers/jestSetup/discord'

describe('Bot — /member', () => {
  it('should return an error for a non-existing member', async () => {
    const interaction = mockInteraction({ username: 'efsfdlfk' })
    const output = await command.execute(interaction, client)

    expect(output.ephemeral).toBeTruthy()
    expect(output.content).toBe(
      'There is no one named “efsfdlfk” on Stormbound-Kitty.'
    )
  })

  it('should return an embed for an existing member', async () => {
    const interaction = mockInteraction({ username: '22cires' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.title).toContain('22cires')
    expect(embed.description).toMatch(
      /22cires is a member of the community and has issued \d+ contributions?./
    )
    expect(embed.fields.length).toBeGreaterThan(0)
    expect(embed.url).toContain('https://stormbound-kitty.com/members/22cires')
  })

  it('should mention premium role', async () => {
    const interaction = mockInteraction({ username: 'subaiku' })
    const output = await command.execute(interaction, client)
    const embed = output.embeds[0].data

    expect(output.ephemeral).toBeTruthy()
    expect(embed.description).toMatch(/They are also a super KAT member!/)
  })
})
