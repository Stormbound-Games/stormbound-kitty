import GUIDES from '../../../data/guides'
import command from './'
const guides = command.handler

describe('Bot — !guides', () => {
  it('should return all guides', () => {
    const embed = guides()
    GUIDES.forEach(guide => {
      const field = embed.fields.find(field => field.name === guide.name)
      expect(field.name).to.equal(guide.name)
      expect(field.value).to.contain(guide.slug)
    })
  })
})
