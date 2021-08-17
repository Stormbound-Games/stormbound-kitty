import GUIDES from '~/data/guides'
import command from './'
const guides = command.handler.bind(command)

describe('Bot — !guides', () => {
  it('should return all guides', () => {
    const embed = guides()
    GUIDES.forEach(guide => {
      expect(embed.description).to.contain(guide.name)
      expect(embed.description).to.contain(guide.slug)
    })
  })
})
